const { client } = require("./client");
const {
  createUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");
const {
  createActivity,
  getActivityById,
  updateActivity,
} = require("./adapters/activities");
const { createRoutine } = require("./adapters/routines");
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

    //users
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
        );`);
    console.log("users table created");

    //routines
    await client.query(`CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255)UNIQUE NOT NULL,
        goal TEXT NOT NUll
      );`);
    console.log("Routines tables created");

    //activities
    await client.query(`CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );`);
    console.log("Activities table created");

    //routine_activities
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

    console.log("getting user id");

    const user_ = await getUserById(1);
    console.log("user is", user_);

    const _user = await getUserByUsername("Daniel");
    console.log("user is", _user);

    console.log("populating activities table");
    for (const activity of activities) {
      await createActivity(activity);
    }
    console.log("activities table populated");

    const activity_ = await getActivityById(7);
    console.log("activity you selected is", activity_);

    const _activity = await updateActivity("squats");
    console.log("activity updated", _activity);

    console.log("populating routines tables");
    for (const routine of routines) {
      await createRoutine(routine);
    }
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
