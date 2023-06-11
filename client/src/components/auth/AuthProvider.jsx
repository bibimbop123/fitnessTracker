import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMe } from "../../API/usersAuth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({ username: "Stranger" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getMe() {
      try {
        const { message, success, user } = await fetchMe(token);
        setUser(user);
        setLoggedIn(true);
      } catch (error) {
        setUser({ username: "Stranger" });
        setLoggedIn(false);
      }
    }
    getMe();
  }, [loggedIn, token]);

  const contextValue = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
    token,
    setToken,
  };
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  console.log("user from Auth Context", user);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
