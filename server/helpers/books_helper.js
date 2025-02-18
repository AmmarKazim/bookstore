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
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('The Biology Book','https://m.media-amazon.com/images/I/51mmwK3J0gL._SX342_SY445_.jpg', 900, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 6);
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('Chemistry: The Central Science','https://m.media-amazon.com/images/I/519VwqZk+TL._SX342_SY445_.jpg', 470, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 5);
INSERT INTO books (title, cover, price, description, categoryid) VALUES ('The Art of the SNL Portrait','https://m.media-amazon.com/images/I/71+Jx-1my+L._SY385_.jpg', 128, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2);


SELECT * FROM  books;
*/
