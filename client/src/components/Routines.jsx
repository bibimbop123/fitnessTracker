import getRoutines from "../API/routinesAPI";
import { useState, useEffect } from "react";

const RoutinesComponent = () => {
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    async function fetchRoutines() {
      const response = await getRoutines();
      setRoutines(response);
    }
    fetchRoutines();
  }, []);
  console.log("routines??", routines);
  return (
    <div>
      {routines.map((routine, idx) => {
        return (
          <div key={idx}>
            <h1>{routine.name}</h1>
            <p>{routine.goal}</p>
            <p>{routine.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RoutinesComponent;
