import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Fitness Tracker App!</h1>
      <p>Start tracking your fitness routines and activities today.</p>
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
