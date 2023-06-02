const { client } = require("../client");
async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES($1,$2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
      [username, password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
async function getAllUsers() {
  const { rows } = await client.query(`
    SELECT * FROM users;
  `);
  return rows;
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT username
      FROM users
      WHERE id=${id}
    `);

    if (!user) {
      return null;
    }

    // user.posts = await getPostsByUser(userId);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getAllUsers, getUserByUsername, getUserById };
