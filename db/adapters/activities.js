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

async function getAllActivities() {
  const { rows } = await client.query(`
    SELECT * FROM activities;
  `);
  return rows;
}
//work on this
async function getActivityById(id) {
  const {
    rows: [activity],
  } = await client.query(`
    SELECT * FROM activities
    WHERE id=${id};
  `);
  return activity;
}

async function updateActivity(activityId, name, description, creator_Id) {
  // const setString = Object.keys(fields)
  //   .map((key, index) => `"${key}"=$${index + 1}`)
  //   .join(", ");

  // if (setString.length === 0) {
  //   return;
  // }

  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET name = $1, description = $2     
      FROM routine_activities
      FULL OUTER JOIN routines
      ON routines.id = routine_activities.routine_id
      WHERE activities.id = $3 AND routine_activities.activity_id = activities.id AND routines.creator_id = $4
      returning *
      `,
      [name, description, activityId, creator_Id]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
};
