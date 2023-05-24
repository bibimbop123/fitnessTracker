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
    name: "arms",
    goal: "get swole",
  },
  {
    creator_id: 2,
    is_public: true,
    name: "leg ",
    goal: "get swole",
  },
  {
    creator_id: 3,
    is_public: true,
    name: "back",
    goal: "get swole",
  },
  {
    creator_id: 4,
    is_public: true,
    name: "chest",
    goal: "get swole",
  },
  {
    creator_id: 5,
    is_public: true,
    name: "Abs",
    goal: "get swole",
  },
  // {
  //   creator_id: 5,
  //   is_public: true,
  //   name: "hiit cardio",
  //   goal: "heart and lung health",
  // },
  // {
  //   creator_id: 1,
  //   is_public: true,
  //   name: "stretching",
  //   goal: "touch your toes",
  // },
];
const routine_activities = [];

module.exports = { users, activities, routines, routine_activities };
