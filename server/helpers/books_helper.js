import { db } from "../app.js";

// fetch and return either allBooks or false flag
async function fetchAllBooks() {
  try {
    const result = await db.query(
      // "SELECT id, title, cover, price::money::numeric::float8, description, categoryid FROM books;"
      `SELECT books.id, books.title, books.cover, books.price::money::numeric::float8, books.description, categories.title AS category
      FROM books
      JOIN categories ON (books.categoryid = categories.id);`
    );
    return result.rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { fetchAllBooks };

/*
CREATE TABLE books (id SERIAL, title TEXT, cover TEXT, price MONEY, description TEXT, categoryid INTEGER, PRIMARY KEY (id), FOREIGN KEY (categoryid) REFERENCES categories(id));
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('History of Art','https://m.media-amazon.com/images/I/31P-jneQAAL._SX342_SY445_.jpg', 250, 'This is a description for the book History of Art.', 2);
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('Basic Physics','https://m.media-amazon.com/images/I/412K7+ypP8L._SX342_SY445_.jpg', 406, 'This is a description for the book Basic Physics.', 3);
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('Nuclear Physics','https://m.media-amazon.com/images/I/71zb7yjdnBL._SY466_.jpg', 244, 'This is a description for the book Nuclear Physics.', 4);
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('Self-Teaching Chemistry','https://m.media-amazon.com/images/I/715cwMkhspL._SY385_.jpg', 123, 'This is a description for the book Self-Teaching Chemistry.', 5);
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('Self-Teaching Biology','https://m.media-amazon.com/images/I/31GiASug51L._SX342_SY445_.jpg', 700, 'This is a description for the book Self-Teaching Biology.', 6);
SELECT * FROM  books;
*/
