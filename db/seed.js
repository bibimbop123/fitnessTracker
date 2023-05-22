const { client } = require("./client");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
  // Drop all tables in order
  try {
    console.log("starting to drop tables");
    await client.query(`
      DROP TABLE IF EXISTS routineActivites,
      DROP TABLE IF EXISTS activites,
      DROP TABLE IF EXISTS routines,
      DROP TABLE IF EXISTS users
      `);
    console.log("finished dropping tables");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createTables() {
  // Define your tables and fields
  try {
    console.log("Starting to create tables...");
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
        );
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255)UNIQUE NOT NULL,
        goal TEXT NOT NUll
      );
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );
      CREATE TABLE routineActivities (
        id SERIAL PRIMARY KEY,
        routine_id INTEGER UNIQUE REFERENCES routines(id),
        activity_id INTEGER UNIQUE REFERENCES activities (id),
        duration INTEGER,
        count INTEGER
      );
  `);
  } catch (error) {
    console.error("Error creating tables!");
    throw error;
  }
}

async function populateTables(username, password) {
  console.log("populating initial tables");
  try {
    const {
      rows: [users],
    } = await client.query(
      `
      INSERT INTO users(username, password))
      VALUES($1,$2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `,
      [username, password]
    );
    return { rows };
  } catch (error) {
    throw error;
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
