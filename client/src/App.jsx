import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoutinesComponent from "./components/Routines";
import ActivitiesComponent from "./components/Activities";
import Nav from "./components/Nav";
import AuthForm from "./components/auth/AuthForm";
import useAuth from "./hooks/useAuth";
// import ActivitiesComponent from "./components/Activities";

function App() {
  const { token, user } = useAuth();
  console.log("token in app.jsx:", token);
  console.log("User in app.jsx:", user);

  const ProtectedRoute = () => {};
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
