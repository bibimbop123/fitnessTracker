import { useState } from "react";
import { registerUser, loginUser } from "../../API/usersAuth";
import { useLocation, useNaviage } from "react-router-dom";

export default function AuthForm() {
  const { pathname } = useLocation();
  const navigate = useNaviage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "register") {
        result = await registerUser(username, password);
      } else {
        result = await loginUser(username, password);
      }
      if (result.success) {
        console.log("Auth Results", result);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="outerForm">
        <h2>LOG IN</h2>
        <div className="form">
          <form>
            <input
              required
              type="text"
              name="username"
              placeholder="username"
              // onChange={(e) => checkUsername(e.target.value)}
            />
            <input
              required
              type="text"
              name="password"
              placeholder="password"
              // onChange={(e) => checkPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
