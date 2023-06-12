export default async function getRoutines() {
  try {
    const response = await fetch(`/api/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  getRoutines();
}
export async function createRoutine(is_public, name, goal) {
  try {
    const response = await fetch("/api/routines/", {
      method: "POST",
      body: JSON.stringify({
        is_public,
        name,
        goal,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
