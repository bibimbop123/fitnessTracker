import { Link } from "react-router-dom";
import { logout } from "../API/usersAuth";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const { user, setLoggedIn, loggedIn } = useAuth();

  async function handleLogout() {
    await logout();
    setLoggedIn(!loggedIn);
  }

  return (
    <nav className="navbar">
      <h3 className="navbar__username">Hi, {user.username}</h3>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
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
      </ul>
      <button className="navbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
