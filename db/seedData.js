const users = [
  { username: "Daniel", password: 123456 },
  { username: "Brian", password: 12345678 },
  { username: "pawan", password: 12345678 },
  { username: "collin", password: 12345678 },
  { username: "Chris", password: 12345678 },
  { username: "jimmy butler", password: 12345678 },
  { username: " jayson tatum", password: 12345678 },
];
const activities = [
  { name: "squats", description: "LEGS" },
  { name: "lunges", description: "LEGS" },
  { name: "deadlifts", description: "LEGS" },
  { name: "calf raises", description: "LEGS" },
  { name: "hip thrusts/bridges", description: "LEGS" },
  { name: "bicep curl", description: "ARMS" },
  { name: "tricep extension", description: "ARMS" },
  { name: "shoulder press", description: "ARMS" },
  { name: "hammercurls", description: "ARMS" },
  { name: "skullcrushers", description: "ARMS" },
  { name: "lat. pull down", description: "BACK" },
  { name: "rows", description: "BACK" },
  { name: "chest press", description: "CHEST" },
  { name: "push ups", description: "CHEST" },
  { name: "sit up", description: "ABS" },
  { name: "walking", description: "CARDIO" },
  { name: "downward dog", description: "STRETCHING" },
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
  {
    creator_id: 6,
    is_public: true,
    name: "hiit cardio",
    goal: "heart and lung health",
  },
  {
    creator_id: 7,
    is_public: true,
    name: "stretching",
    goal: "touch your toes",
  },
];
const routine_activities = [
  //arms
  {
    routine_id: 1,
    activity_id: 6,
    duration: 1,
    count: 8,
  },
  {
    routine_id: 1,
    activity_id: 7,
    duration: 1,
    count: 8,
  },
  {
    routine_id: 1,
    activity_id: 8,
    duration: 1,
    count: 8,
  },
  {
    routine_id: 1,
    activity_id: 9,
    duration: 1,
    count: 8,
  },
  {
    routine_id: 1,
    activity_id: 10,
    duration: 1,
    count: 8,
  },
  //legs
  // {
  //   routine_id: 2,
  //   activity_id: 1,
  //   duration: 1,
  //   count: 8,
  // },
  // {
  //   routine_id: 2,
  //   activity_id: 2,
  //   duration: 1,
  //   count: 8,
  // },
  // {
  //   routine_id: 2,
  //   activity_id: 3,
  //   duration: 1,
  //   count: 8,
  // },
  // {
  //   routine_id: 2,
  //   activity_id: 4,
  //   duration: 1,
  //   count: 8,
  // },
  // {
  //   routine_id: 2,
  //   activity_id: 5,
  //   duration: 1,
  //   count: 8,
  // },
  // //back
  // {
  //   routine_id: 3,
  //   activity_id: 11,
  //   duration: 1,
  //   count: 8,
  // },
  // {
  //   routine_id: 3,
  //   activity_id: 12,
  //   duration: 1,
  //   count: 8,
  // },
  // //chest
  // {
  //   routine_id: 4,
  //   activity_id: 13,
  //   duration: 1,
  //   count: 8,
  // },
  // {
  //   routine_id: 4,
  //   activity_id: 14,
  //   duration: 1,
  //   count: 8,
  // },
  // //abs
  // {
  //   routine_id: 5,
  //   activity_id: 15,
  //   duration: 1,
  //   count: 8,
  // },
  // //cardio
  // {
  //   routine_id: 6,
  //   activity_id: 16,
  //   duration: 1,
  //   count: 8,
  // },
  // //stretching
  // {
  //   routine_id: 7,
  //   activity_id: 17,
  //   duration: 1,
  //   count: 8,
  // },
];

module.exports = { users, activities, routines, routine_activities };
