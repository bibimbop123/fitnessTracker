import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { getUserRoutines } from "../API/usersAuth";

function ProfileComponent() {
  const [user, setUser] = useState(useAuth());
  console.log("user:", user);

  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    async function getRoutinesbyUser() {
      const response = await getUserRoutines();
      console.log("response:", response);
      setMyRoutines([response]);
      setUser(user);
    }
    getRoutinesbyUser();
  }, [user]);
  return (
    <>
      <div className="profilePage">
        <h1> Welcome to your Profile {user.username}</h1>
        <h2> my routines</h2>
        <div className="myroutines">
          {myRoutines.map((routine, idx) => {
            return (
              <>
                <div className="routine">
                  <div key={idx} className="routinecard">
                    <p>{routine.name}</p>
                    <p>{routine.goal}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export { ProfileComponent };
