import { v4 as uuidV4 } from "uuid";
import { getSession } from "next-auth/react";

//components
import { Content, User } from "@/lib/database/connection";
import apiHandler from "@/helpers/api/globalApiHandler";
import { getUserRoles } from "@/helpers/api/users";

const createContent = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user"
    });
  }
  const { publisher_name, title, metadata } = req.body;
  console.log("publisher_name", publisher_name, title);

  const find_author_uuid = await User.findOne({
    where: {
      publisher_name
    }
  });
  const author_uuid = await find_author_uuid.get({ plain: true });
  console.log("author_uuidxxxx", author_uuid);
  if (!author_uuid) {
    return res.status(401).json({
      success: false,
      message: "publisher not found"
    });
  }
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
  const isAdmin = roles?.roles?.includes("atom-admin");

  if (!isAdmin) {
    return { success: false, message: "User must be a atom-admin" };
  }

  const book = await Content.findOne({
    where: {
      uuid: book_uuid
    }
  });
  if (!book) {
    return {
      success: false,
      type: "create",
      message:
        "Book doesn't exist, so nothing was updated. Please check book_uuid."
    };
  }
  let dataToUpdate = {
    title,
    metadata,
    uuid: book_uuid ? book_uuid : uuidV4(),
    slug: title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace("'", "")
      .replace("!", "")
  };

  if (!book) {
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
    console.log("should update", dataToUpdate);
    return {
      success: true,
      type: "update",
      data: dataToUpdate
    };
  }

  return {
    success: true,
    type: "update",
    data: { ...dataToUpdate, publisher_name }
  };
};

async function updateContent(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      success: false,
      type: "create",
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

  console.log("update content", req.body);
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
    let content;
    //success
    if (check.type === "create") {
      //create this content
      const newBook = req.body;
      newBook.uuid = newBook.book_uuid;
      delete newBook.book_uuid;

      content = await Content.create(newBook);
    } else {
      //update existing content
      content = await Content.update(check.data, {
        where: {
          uuid: book_uuid
        }
      });
    }

    if (content) {
      return res.status(200).json({
        success: true,
        message: "Book was updated successfully"
      });
    }
  } catch (error) {
    console.log("error", error);

    return res.status(400).json({
      success: false,
      message:
        "Something went wrong during update. Unknown error, so try again later."
    });
  }
}

const getActiveContent = async (req, res) => {
  const { book_uuid } = req.body;

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

    return res.status(200).json({ success: true, data: book });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

export default apiHandler({
  patch: [updateContent, true],
  get: [getActiveContent, true],
  post: [createContent, true]
});
