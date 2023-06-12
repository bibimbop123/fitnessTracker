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

export async function createActivity(name, description) {
  try {
    const response = await fetch("/api/activities/", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
