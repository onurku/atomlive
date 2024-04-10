import { Content, User } from "@/lib/database/connection";

const getContentBySlug = async (slug) => {
  let book = await Content.findOne({
    where: {
      slug,
      is_active: true
    },
    attributes: { exclude: ["id", "is_active"] }
  });

  book = book.get({ raw: true });
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found." });
  }

  const publisher_name = book.publisher_name;
  let series = await Content.findAll({
    where: {
      publisher_name: publisher_name,
      is_active: true
    },
    attributes: { exclude: ["id", "is_active"] }
  });

  const allData = { ...book, series };

  return allData;

  // try {
  //   let book = await Content.findOne({
  //     where: {
  //       slug,
  //       is_active: true
  //     },
  //     attributes: { exclude: ["id", "is_active"] }
  //   });

  //   book = book.get({ plain: true });
  //   if (!book) {
  //     return res
  //       .status(404)
  //       .json({ success: false, message: "Book not found." });
  //   }

  //   console.log("=====book", book);
  //   const publisher_name = book.publisher_name;
  //   console.log("publishername", publisher_name);
  //   let series = await Content.findAll({
  //     where: {
  //       publisher_name: publisher_name,
  //       is_active: true
  //     },
  //     attributes: { exclude: ["id", "is_active"] }
  //   });

  //   console.log("=====series", series);

  //   const allData = { ...book, series };

  //   return allData;
  // } catch (e) {
  //   console.log("catch error");
  //   return null;
  // }
};

export default getContentBySlug;
