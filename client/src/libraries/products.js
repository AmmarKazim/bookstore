import axios from "axios";

async function fetchAllBooks() {
  const booksResponse = await axios.get("http://localhost:3000/books");
  const books = booksResponse.data;
  return books;
}

export { fetchAllBooks };
