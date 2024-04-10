import allBooks from "@/ar_content/books/all";

export default function handler(req, res) {
  const { method } = req;
  console.log("handler", method);
  if (method === "GET") {
    console.log(allBooks);
    res.status(200).json(allBooks);
  }
}
