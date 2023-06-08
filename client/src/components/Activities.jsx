import getActivities from "../API/activitiesAPI";
import { useState, useEffect } from "react";

const ActivitiesComponent = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    async function fetchActivities() {
      const response = await getActivities();
      setActivities(response);
    }
    fetchActivities();
  }, []);
  console.log("activities??", activities);
  return (
    <div>
      {activities.map((activity, idx) => {
        return (
          <div key={idx}>
            <h1>{activity.name}</h1>
            <p>{activity.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ActivitiesComponent;
