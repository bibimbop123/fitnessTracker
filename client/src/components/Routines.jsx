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
    <div className="routines-container">
      {routines.map((routine, idx) => (
        <div key={idx} className="routine-card">
          <h1 className="routine-card__name">Routine: {routine.name}</h1>
          <p className="routine-card__goal">Goal: {routine.goal}</p>
          <p className="routine-card__description">
            Description: {routine.description}
          </p>
          <p className="routine-card__user">User: {routine.username}</p>
        </div>
      ))}
    </div>
  );
};

export default RoutinesComponent;
