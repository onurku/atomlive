import { Op } from "sequelize";
import Joi from "joi";
import joiValidationHelper from "@/helpers/api/validation";

//app
import { Content, Series, SeriesContentMap } from "@/lib/database/connection";
import apiHandler from "helpers/api/globalApiHandler";

const updateSeries = async (req, res) => {
  const { series_uuid } = req.query;
  const { book_uuids } = req.body;

  try {
    const series = await Series.findOne({
      where: {
        series_uuid
      }
    });

    //TO DO: update series

    return res.status(200).json({ success: true, data: updatedSeries });
  } catch (e) {
    res.status(405).json({ success: false, message: e.message });
  }
};

const getSeriesSchema = Joi.object({
  series_uuid: Joi.string().required()
});

const getSeries = async (req, res) => {
  const { series_uuid } = req.query;

  const validationErr = joiValidationHelper(getSeriesSchema, req.query);
  if (validationErr !== undefined) {
    return res.status(400).json({
      status: false,
      error: validationErr,
      message: "Series uuid is required."
    });
  }

  try {
    const series = await Series.findOne({
      where: {
        series_uuid
      }
    });

    if (series === null) {
      return res
        .status(404)
        .json({ success: false, message: "Series UUID not valid" });
    }

    const series_id = series.dataValues.id;
    const content = await SeriesContentMap.findAll({
      where: {
        series_id: series_id
      }
    });
    if (content === null) {
      return res.json({ success: true, data: [] });
    }

    //if content found, get content
    const content_ids = [];
    const allContent = [];

    for (let i = 0; i < content.length; i++) {
      const book_id = content[i].dataValues.content_id;
      content_ids.push(book_id);
      const metadata = await Content.findOne({
        where: {
          [Op.and]: [{ id: book_id }, { is_active: true }]
        },
        attributes: { exclude: ["id", "is_active"] }
      });
      allContent.push(metadata.dataValues);
    }

    return res.json({ success: true, data: allContent });
  } catch (e) {
    res.status(405).json({ success: false, message: e.message });
  }
};

export default apiHandler({
  get: [getSeries, false],
  patch: [updateSeries, true]
});
