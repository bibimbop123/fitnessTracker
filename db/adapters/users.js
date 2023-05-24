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
  try {
    const { rows } = await client.query(`
      SELECT id, username, password
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getAllUsers };
