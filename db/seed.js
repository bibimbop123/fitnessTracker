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
    await client.query("DROP TABLE IF EXISTS users");
    console.log("finished dropping tables");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createTables() {
  // Define your tables and fields
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js
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
