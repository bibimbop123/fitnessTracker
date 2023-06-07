import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import RoutinesComponent from "./components/Routines";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/routines">Routines</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<RoutinesComponent />} />
      </Routes>
    </div>
  );
}

export default App;
