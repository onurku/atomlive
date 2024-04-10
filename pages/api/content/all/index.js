import { Content } from "@/lib/database/connection";
import apiHandler from "helpers/api/globalApiHandler";

const getActiveContent = async (req, res) => {
  let books = await Content.findAll({
    where: {
      is_active: true
    },
    attributes: { exclude: ["id", "is_active"] }
  });

  const booksObj = {};
  books.forEach((book, index) => {
    book = book.get({ plain: true });
    const publisher = book?.publisher_name;
    if (!booksObj[publisher]) {
      booksObj[publisher] = [];
    }
    booksObj[publisher].push(book);
  });

  return res.json({ success: true, data: booksObj });
};

export default apiHandler({
  get: [getActiveContent, false]
});
