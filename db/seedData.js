const users = [
  { username: "Daniel", password: 123456 },
  { username: "Brian", password: 12345678 },
  { username: "pawan", password: 12345678 },
  { username: "collin", password: 12345678 },
  { username: "Chris", password: 12345678 },
];
const activities = [
  { id: "1", name: "squats", description: "LEGS" },
  { id: "2", name: "lunges", description: "LEGS" },
  { id: "3", name: "deadlifts", description: "LEGS" },
  { id: "4", name: "calf raises", description: "LEGS" },
  { id: "5", name: "hip thrusts/bridges", description: "LEGS" },
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
