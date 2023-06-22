import { Link, useNavigate } from "react-router-dom";
import { logout } from "../API/usersAuth";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const { setLoggedIn, loggedIn } = useAuth();
  const { token, user } = useAuth();
  console.log("token in app.jsx:", token);
  console.log("User in app.jsx:", user);

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <h3 className="navbar__username">Hi, {user.username}</h3>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user?.username != "Stranger" && (
          <>
            <li>
              <Link to="/users/profile">Profile</Link>
            </li>
            <li>
              <Link to="/routines">Routines</Link>
            </li>
            <li>
              <Link to="/activities">Activities</Link>
            </li>
            <li>
              <Link to="/createActivity">Create Activity</Link>
            </li>
            <li>
              <Link to="/createRoutine">Create Routine</Link>
            </li>
          </>
        )}
        {(user?.username == "Stranger" || user?.username == "Stranger") && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/routines">Routines</Link>
            </li>
            <li>
              <Link to="/activities">Activities</Link>
            </li>
          </>
        )}
      </ul>
      <button className="navbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
