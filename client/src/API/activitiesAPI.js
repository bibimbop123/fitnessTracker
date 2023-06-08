export default async function getActivities() {
  try {
    const response = await fetch(`/api/activities`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  getActivities();
}
