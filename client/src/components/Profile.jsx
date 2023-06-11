import useAuth from "../hooks/useAuth";
import { logout } from "../API/usersAuth";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, SetLoggedIn } = useAuth();
  console.log("user: ", user);
  const navigate = useNavigate();

  return (
    <div className="profilePage">
      <h1> Welcome to your Profile ${user.username}</h1>
    </div>
  );
}
