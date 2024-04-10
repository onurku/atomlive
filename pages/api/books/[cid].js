import a_guest_on_a_farm from "@/ar_content/books/a_guest_on_a_farm";
import the_king_of_the_birds from "@/ar_content/books/library/atom/the_king_of_the_birds";

export default function handler(req, res) {
  const { method, query } = req;
  const { cid } = query;

  if (method === "GET") {
    switch (cid) {
      case "the_king_of_the_birds":
        res.status(200).json(the_king_of_the_birds);
        break;
      case "a_guest_on_a_farm":
        res.status(200).json(a_guest_on_a_farm);
        break;
      default:
        res.status(200).json(the_king_of_the_birds);
    }
  }
}
