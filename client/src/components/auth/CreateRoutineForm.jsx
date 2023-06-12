import { useState } from "react";
import { createRoutine } from "../../API/routinesAPI";

export default function CreateRoutine() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [is_public, setIs_Public] = useState(false);
  const [newRoutine, setNewRoutine] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await createRoutine({ is_public, name, goal });
      console.log("result:", result);
      setNewRoutine(result);

      alert("created new Routine");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="routine-form">
      <h2>Create a Routine</h2>
      <form className="routine-form" onSubmit={handleSubmit}>
        <label> Please enter a Routine </label>

        <input
          type="text"
          value={name}
          placeholder="enter a routine name"
          onChange={(e) => {
            e.preventDefault;

            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={goal}
          placeholder="enter a routine goal"
          onChange={(e) => {
            e.preventDefault;

            setGoal(e.target.value);
          }}
        />
        <label>is it public?</label>
        <input
          type="checkbox"
          value={true}
          name={is_public}
          placeholder="is it public?"
          onChange={(e) => {
            e.preventDefault;

            setIs_Public(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
