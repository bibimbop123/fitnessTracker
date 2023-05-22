// import { Client } from "pg";
const { Client } = require("pg");
const client = new Client(
  "postgres://localhost:5432/FitnessTrackerBackend-dev"
);
module.exports = {
  client,
};
