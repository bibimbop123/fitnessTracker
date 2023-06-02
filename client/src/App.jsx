import { useState, useEffect } from "react";

function App() {
  const [healthMessage, setHealthMessage] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    async function checkAPIHealth() {
      try {
        const response = await fetch("/api/health");
        const result = await response.json();
        console.log("result:", result);
        setHealthMessage(result.message);
      } catch (error) {
        setError(error);
      }
    }
    checkAPIHealth();
  }, []);
  return (
    <>
      {error && <p>{JSON.stringify(error, null, 2)}</p>}
      <p>{healthMessage}</p>
    </>
  );
}

export default App;
