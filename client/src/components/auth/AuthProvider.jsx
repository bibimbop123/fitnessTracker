import { createContext, useState, useEffect } from "react";
import { logout } from "../../API/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Guest" });

  useEffect(() => {
    async function logOut() {
      try {
        const { message, success, user } = await logout;
        setUser(user);
      } catch (error) {
        setUser({ username: "Guest" });
      }
    }
    logOut();
  }, []);
  const contextValue = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
