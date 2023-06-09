import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RoutinesComponent from "./components/Routines";
import Nav from "./components/Nav";
import AuthForm from "./components/auth/AuthForm";
import ActivitiesComponent from "./components/Activities";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/routines">Routines</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/routines" element={<RoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
