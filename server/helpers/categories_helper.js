import { db } from "../app.js";

// fetch and return either allCategories or false flag
async function fetchAllCategories() {
  try {
    const result = await db.query("SELECT * FROM categories;");
    return result.rows;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { fetchAllCategories };

/*
CREATE TABLE categories (id SERIAL, title TEXT, parentid INTEGER, PRIMARY KEY(id));
INSERT INTO categories (title) VALUES ('Science');
INSERT INTO categories (title) VALUES ('Arts');
INSERT INTO categories (title, parentid) VALUES ('Physics', 1);
INSERT INTO categories (title, parentid) VALUES ('Nuclear Physics', 3);
INSERT INTO categories (title, parentid) VALUES ('Chemistry', 1);
INSERT INTO categories (title, parentid) VALUES ('Biology', 1);
SELECT * FROM categories;
*/
