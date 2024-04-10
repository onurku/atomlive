import Joi from "joi";
import joiValidationHelper from "@/helpers/api/validation";
import { v4 as uuidV4 } from "uuid";
import { getSession } from "next-auth/react";
import {
  Series,
  Content,
  SeriesContentMap,
  sequelize
} from "@/lib/database/connection";
import apiHandler from "helpers/api/globalApiHandler";

const addSeriesSchema = Joi.object({
  series_name: Joi.string().required(),
  book_uuids: Joi.array().required(),
  series_uuid: Joi.string()
});

const createSeries = async (req, res) => {
  const { series_name, series_uuid, book_uuids } = req.body;
  const session = await getSession({ req });

  const validationErr = joiValidationHelper(addSeriesSchema, req.body);
  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Series Name and book UUIDs are required. Please check again."
    });
  }

  const t = await sequelize.transaction();
  let typeOfTransaction = "update";
  try {
    //get series_uuid from series_name
    let series = (series = await Series.findOne({
      where: {
        series_name
      },
      transaction: t
    }));

    if (!series) {
      //series doesn't exist, so we need to create series
      typeOfTransaction = "create";
      series = await Series.create(
        {
          series_name,
          series_uuid: uuidV4()
        },
        { transaction: t }
      );
    }

    const series_id = series.dataValues.id;

    //retrieve content_id from book_uuids
    const newObjs = [];

    for (let i = 0; i < book_uuids.length; i++) {
      const content = await Content.findOne({
        where: {
          uuid: book_uuids[i]
        },
        transaction: t
      });
      if (content === null) {
        return res.status(404).json({
          success: false,
          message: `Book UUID ${book_uuids[i]} not found`
        });
      }

      newObjs.push({
        content_id: content.dataValues.id,
        series_id: series_id,
        modified_by: session.user.uuid
      });
    }

    let seriesObj;
    if (typeOfTransaction === "update") {
      //delete old mappings if this is an update
      const deleted = await SeriesContentMap.destroy({
        where: {
          series_id: series_id
        }
      });
    }
    seriesObj = await SeriesContentMap.bulkCreate(newObjs, {
      transaction: t
    });

    await t.commit();
    if (seriesObj === null) {
      res
        .status(404)
        .json({ success: false, message: "something went wrong." });
    }
    return res.json({
      success: true,
      message: "Series created successfully",
      data: seriesObj
    });
    // Creating Series Content Mapping
  } catch (e) {
    await t.rollback();
    return res.status(500).end();
  }
};

const getAllSeries = async (req, res) => {};

const updateSeries = async (req, res) => {};

export default apiHandler({
  post: [createSeries, true]
});
