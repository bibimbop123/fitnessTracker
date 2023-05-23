const { client } = require("./client");
const { createUser } = require("./adapters/users");
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
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
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
        );`);
    console.log("users table created");
    await client.query(`CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255)UNIQUE NOT NULL,
        goal TEXT NOT NUll
      );`);
    console.log("Routines tables created");
    await client.query(`CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );`);
    console.log("Activities table created");
    await client.query(`CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        routine_id INTEGER REFERENCES routines(id),
        activity_id INTEGER REFERENCES activities (id),
        duration INTEGER,
        count INTEGER,
        UNIQUE (routine_id, activity_id)
      );`);
    console.log("routine_activities table created");
  } catch (error) {
    console.error("Error creating tables!");
    throw error;
  }
}

async function populateTables() {
  console.log("populating initial tables");
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("users table populated");
  } catch (error) {
    console.error(error);
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
