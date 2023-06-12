import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoutinesComponent from "./components/AllRoutines";
import ActivitiesComponent from "./components/AllActivities";
import Nav from "./components/Nav";
import AuthForm from "./components/auth/AuthForm";
import useAuth from "./hooks/useAuth";
import { ProfileComponent } from "./components/ProfileComponent";
import { CreateActivity } from "./components/auth/CreateActivityForm";

function App() {
  const { token, user } = useAuth();
  console.log("token in app.jsx:", token);
  console.log("User in app.jsx:", user);
  return (
    <div>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
        <Route path="/users/profile" element={<ProfileComponent />} />
        <Route path="/createActivity" element={<CreateActivity />} />
      </Routes>
    </div>
  );
}

export default App;
