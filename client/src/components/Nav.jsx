import { Link } from "react-router-dom";
import { logout } from "../API/usersAuth";
import useAuth from "../hooks/useAuth";

export default function Nav() {
  const { user, setLoggedIn, loggedIn } = useAuth();

  async function handeLogout() {
    await logout();
    setLoggedIn(!loggedIn);
  }

  return (
    <nav>
      <h3>Hello,{user.username}</h3>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/routines">Routines</Link>
      <button onClick={handeLogout}>Logout</button>
    </nav>
  );
}
