const users = [
  { username: "Daniel", password: 123456 },
  { username: "Brian", password: 12345678 },
  { username: "pawan", password: 12345678 },
  { username: "collin", password: 12345678 },
  { username: "Chris", password: 12345678 },
];
const activities = [
  { name: "squats", description: "LEGS" },
  { name: "lunges", description: "LEGS" },
  { name: "deadlifts", description: "LEGS" },
  { name: "calf raises", description: "LEGS" },
  { name: "hip thrusts/bridges", description: "LEGS" },
];
const routines = [
  {
    creator_id: 1,
    is_public: true,
    name: "lift weights",
    goal: "get swole",
  },
  {},
];
const routine_activities = [];

module.exports = { users, activities, routines, routine_activities };
