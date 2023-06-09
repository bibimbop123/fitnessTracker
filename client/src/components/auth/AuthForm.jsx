import { useState } from "react";
import { registerUser, loginUser } from "../../API/usersAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AuthForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

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
        setLoggedIn(true);
        console.log("Auth Results", result);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <div className="form">
        <form onClick={handleSubmit}>
          {pathname === "/register" ? (
            <h2>Register Form</h2>
          ) : (
            <h2>Login Form</h2>
          )}
          {error && <p>{error}</p>}
          <input
            required
            type="text"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="text"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
        {pathname === "/register" ? (
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        )}
      </div>
    </div>
  );
}
