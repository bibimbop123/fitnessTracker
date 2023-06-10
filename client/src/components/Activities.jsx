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
    <div className="activities-container">
      {activities.map((activity, idx) => (
        <div key={idx} className="activity-card">
          <h1 className="activity-card__name">{activity.name}</h1>
          <p className="activity-card__description">{activity.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesComponent;
