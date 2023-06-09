import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
