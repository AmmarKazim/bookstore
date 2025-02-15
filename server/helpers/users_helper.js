// fetch and return either that user or false flag
async function fetchUser(db, user_username) {
  try {
    const queryResult = await db.query(
      "SELECT * FROM users WHERE (username = $1)",
      [user_username]
    );
    // user found
    if (queryResult.rows.length > 0) {
      return queryResult.rows[0];
    } // user not found
    else {
      return null;
    }
  } catch (err) {
    // fetching failure
    console.log(err);
    return null;
  }
}

// insert user in db, return either newly inserted user or false flag
async function insertUser(db, user_username, user_password, user_displayname) {
  try {
    const queryResult = await db.query(
      "INSERT INTO users (username, password, displayname) VALUES ($1, $2, $3) RETURNING *;",
      [user_username, user_password, user_displayname]
    );
    // insertion successful
    return queryResult.rows[0];
  } catch (err) {
    // insertions failure
    console.log(err);
    return false;
  }
}

export { fetchUser, insertUser };

/*
CREATE TABLE users (id SERIAL, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL, displayname TEXT NOT NULL, PRIMARY KEY (id));
INSERT INTO users (username, password, displayname) VALUES ('test1@mail.com', '123' , 'tester1');
INSERT INTO users (username, password, displayname) VALUES ('test2@mail.com', '456' , 'tester2');
SELECT * FROM users;
*/
