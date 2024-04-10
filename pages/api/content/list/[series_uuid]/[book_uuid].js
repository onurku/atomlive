import { Content, Series } from "@/lib/database/connection";
import apiHandler from "helpers/api/globalApiHandler";
import { clone } from "ramda";
import content from "../..";

const addBookToSeries = async (req, res) => {
  const { series_uuid, book_uuid } = req.query;

  const series = await Series.findOne({
    where: {
      series_uuid
    }
  });

  const book = await Content.findOne({
    where: {
      book_uuid
    }
  });

  const seriesBookUUIDS = clone(series.book_uuids);
  const foundIndex = seriesBookUUIDS.findIndex((uuid) => book_uuid === uuid);
  if (foundIndex >= 0) {
    return res.status(400).json({
      success: false,
      message: "Book specified already exists in this series. "
    });
  }
  // if books is not found, proceed to add book to series
  seriesBookUUIDS.push(book_uuid);

  const updatedSeries = await series.update({ book_uuids: seriesBookUUIDS });
  await book.update({ series: [...book.series, updatedSeries] });
  return res.status(200).json({ success: true, data: updatedSeries });
};

const deleteBook = async (req, res) => {
  const { series_uuid, book_uuid } = req.query;
  const series = await Series.findOne({
    where: {
      series_uuid
    }
  });

  const book = await Content.findOne({
    where: {
      book_uuid
    }
  });
  const seriesBookUUIDS = clone(series.book_uuids);
  const foundIndex = seriesBookUUIDS.findIndex((uuid) => book_uuid === uuid);

  if (foundIndex >= 0) {
    const duplicatedBook = clone(book.get({ plain: true }));
    const duplicatedSeries = duplicatedBook.series.filter(
      (series) => series.series_uuid !== series_uuid
    );
    seriesBookUUIDS.splice(foundIndex, 1);
    await series.update({ book_uuids: seriesBookUUIDS });
    await book.update({ series: duplicatedSeries });
    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: series
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Book specified doesn't exist in this series"
    });
  }
};

export default apiHandler({
  post: [addBookToSeries, true],
  delete: [deleteBook, true]
});
