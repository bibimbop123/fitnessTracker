import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import RoutinesComponent from "./components/Routines";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/routines" element={<RoutinesComponent />} />
      </Routes>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/routines">Routines</Link>
      </nav>
    </div>
  );
}

export default App;
