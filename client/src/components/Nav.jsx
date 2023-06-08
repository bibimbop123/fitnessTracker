import { Link } from "react-router-dom";
import { logout } from "../api/auth";

export default function Nav() {
  async function handeLogout() {
    await logout();
  }

  return (
    <nav>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <button onClick={handeLogout}>Logout</button>
    </nav>
  );
}
