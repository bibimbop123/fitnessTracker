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
  const [error, setError] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 8) {
      setError("username must be longer than 8 characters");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("passwords don't match");
      return;
    }

    try {
      let result;
      if (pathname === "/register") {
        result = await registerUser(username, password);
      } else {
        result = await loginUser(username, password);
        alert("you're logged in");
      }
      console.log("Result after login or register: ", result);
      if (result.success) {
        setLoggedIn(true);

        console.log("Auth Results", result);
        navigate("/users/profile");
      }
    } catch (error) {
      setError(error.message);
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>{pathname === "/register" ? "Register" : "Login"}</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            required
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="password confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          {pathname === "/register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Link to={pathname === "/register" ? "/register" : "/login"}>
            {pathname === "/login" ? "Sign Up" : "Login Here"}
          </Link>
        </p>
      </div>
    </div>
  );
}
