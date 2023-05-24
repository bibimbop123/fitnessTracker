const { client } = require("../client");

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
              INSERT INTO activities(name, description)
              VALUES($1,$2)
              ON CONFLICT (name) DO NOTHING
              RETURNING *;
              `,
      [name, description]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}
