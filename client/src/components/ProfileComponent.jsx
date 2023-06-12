import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { getUserRoutines } from "../API/usersAuth";

function ProfileComponent() {
  const { user } = useAuth();

  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    async function getRoutinesbyUser() {
      const response = await getUserRoutines(user);
      console.log("response:", response);
      setMyRoutines(response);
    }
    getRoutinesbyUser();
  }, [user]);

  return (
    <div className="profilePage">
      <h1>Welcome to your Profile, {user.username}</h1>
      <h2>My Routines</h2>
      <div className="myroutines">
        {myRoutines.map((routine, idx) => (
          <div className="routine" key={idx}>
            <div className="routinecard">
              {/* <p>{routine.routineName}</p>
              <p>{routine.routineGoal}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ProfileComponent };
