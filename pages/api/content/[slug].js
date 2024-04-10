import { v4 as uuidV4 } from "uuid";
import { getSession } from "next-auth/react";

//components
import {
  Content,
  Series,
  SeriesContentMap,
  User,
  sequelize
} from "@/lib/database/connection";
import apiHandler from "@/helpers/api/globalApiHandler";
import { getUserRoles } from "@/helpers/api/users";
import {
  getAllContentBySeriesId,
  getSubscriptionOptionsBySeriesId
} from "@/helpers/api/content";

const createContent = async ({
  book_uuid,
  author_uuid,
  publisher_name,
  publisher_uuid,
  title,
  metadata
}) => {
  const allowedFields = [
    "uuid",
    "is_active",
    "metadata",
    "author_uuid",
    "publisher_name",
    "publisher_uuid",
    "title",
    "book_uuid"
  ];
};

//shouldPerformUpdateOrCreate is a check whether db access should be allowed.
const shouldPerformUpdateOrCreate = async ({
  book_uuid,
  author_uuid,
  publisher_name,
  publisher_uuid,
  title,
  metadata,
  session,
  force_update
}) => {
  const roles = await getUserRoles(session.user.uuid);
  const isAdmin = roles.roles.includes("atom-admin");

  if (!isAdmin) {
    return { success: false, message: "User must be a atom-admin" };
  }

  const t = await sequelize.transaction();

  try {
    const book = await Content.findOne({
      where: {
        uuid: book_uuid
      }
    });

    if (!book && (force_update === false || force_update === undefined)) {
      return {
        success: false,
        message:
          "Book doesn't exist, so nothing was updated. Please check book_uuid."
      };
    }
    let dataToUpdate = {
      title,
      metadata,
      uuid: book_uuid || uuidV4(),
      slug: title.toLowerCase().split(" ").join("-")
    };

    if (!book && force_update === 1) {
      // if book doesn't exist, and force_update is specified, perform create book
      let pub_name;

      if (author_uuid) {
        //check if author valid
        const author = await User.findOne({
          where: {
            uuid: author_uuid
          }
        });

        if (!author) {
          return {
            success: false,
            message: "Author uuid does not exist."
          };
        }

        //author exists, so author_uuid
        dataToUpdate.author_uuid = author_uuid;
      }

      if (publisher_uuid) {
        //check if author valid
        const publisher = await User.findOne({
          where: {
            uuid: publisher_uuid
          },
          attributes: { exclude: ["id", "is_active"] }
        });

        if (!publisher) {
          return {
            success: false,
            message: "Publisher uuid does not exist."
          };
        }

        //publisher exists
        dataToUpdate.publisher_uuid = publisher_uuid;
        if (
          !publisher_name ||
          publisher_name !== `${publisher.first_name} ${publisher.last_name}`
        ) {
          pub_name = `${publisher.first_name} ${publisher.last_name}`;
          dataToUpdate.publisher_name = pub_name;
        }
      }

      if (!dataToUpdate.publisher_name) {
        dataToUpdate.publisher_name = publisher_name;
      }

      return {
        success: true,
        type: "create",
        data: dataToUpdate
      };
    }

    await t.commit();
    return {
      success: true,
      type: "update",
      data: { ...dataToUpdate, publisher_name }
    };
  } catch (e) {
    await t.rollback();
    return {
      success: false,
      error: e.message
    };
  }
};

async function updateContent(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user"
    });
  }

  const {
    book_uuid,
    author_uuid,
    publisher_name,
    publisher_uuid,
    title,
    metadata,
    force_update //send in a param called force_update if book should be created when it doesn't exist.
  } = req.body;

  //either publisher_name or publisher_uuid required
  if (!(publisher_name || publisher_uuid)) {
    res.status(400).json({
      success: false,
      message:
        "Either publisher_name or publisher_uuid must be submitted with request."
    });
  }

  try {
    //find if book exists in db

    const check = await shouldPerformUpdateOrCreate({ ...req.body, session });
    if (!check.success) {
      return res.status(400).json(check);
    }

    //success
    let content;
    if (check.type === "create") {
      //create this content
      content = await Content.create(check.data);
    } else {
      //update existing content
      content = await Content.update(check.data, {
        where: {
          uuid: book_uuid
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book was updated successfully"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Something went wrong during update. Unknown error, so try again later."
    });
  }
}

const getActiveContent = async (req, res) => {
  const { book_uuid } = req.body;

  const t = await sequelize.transaction();
  try {
    let book = await Content.findOne({
      where: {
        book_uuid,
        is_active: true
      },
      attributes: { exclude: ["id", "is_active"] }
    });

    book = book.get({ plain: true });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    //success
    delete book.id;
    delete book.is_active;

    await t.commit();
    return res.status(200).json({ success: true, data: book });
  } catch (e) {
    await t.rollback();
    return res.status(500).json({ success: false, message: e.message });
  }
};

const getContentBySlug = async (req, res) => {
  const { slug } = req.query;
  console.log("getContentBySlug", slug);

  const t = sequelize.transaction();
  try {
    let book = await Content.findOne({
      where: {
        slug,
        is_active: true
      },
      attributes: { exclude: ["is_active"] }
    });
    console.log("book", book);
    book = book.get({ plain: true });

    if (!book) {
      console.log("book not found");
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    //Find all books in this series
    let series_content_map = await SeriesContentMap.findOne({
      where: {
        content_id: book.id
      }
    });
    console.log("series_content_map", series_content_map);

    if (!series_content_map) {
      return res.json({
        success: true,
        data: {
          ...book,
          series: null
        }
      });
    }
    series_content_map = series_content_map.get({ plain: true });

    const series_id = series_content_map.series_id;
    const booksInSeries = await getAllContentBySeriesId(series_id);

    let series = await Series.findOne({
      where: {
        id: series_id
      }
    });
    series = series.get({ plain: true });

    const subscriptionOptions = await getSubscriptionOptionsBySeriesId({
      series_id: series.id
    });
    delete book.id;

    const allData = {
      ...book,
      series: {
        series_uuid: series.series_uuid,
        books: booksInSeries,
        subscription_options: subscriptionOptions ? subscriptionOptions : null
      }
    };
    console.log("book data", allData);
    return res.json({ success: true, data: allData });
  } catch (e) {
    return res.status(500).end();
  }
};

export default apiHandler({
  get: [getContentBySlug, false],
  post: [createContent, false]
});
