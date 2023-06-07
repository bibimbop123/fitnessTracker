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
