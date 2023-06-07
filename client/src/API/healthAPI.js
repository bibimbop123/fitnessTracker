export async function checkAPIHealth() {
  try {
    const response = await fetch("/api/health");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }

  checkAPIHealth();
}
