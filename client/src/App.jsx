import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import RoutinesComponent from "./components/Routines";
import ActivitiesComponent from "./components/Activities";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/routines">Routines</Link>
        <Link to="/activities">Activities</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<RoutinesComponent />} />
        <Route path="/activities" element={<ActivitiesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
