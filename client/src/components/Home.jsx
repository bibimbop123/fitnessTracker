const Home = () => {
  // const [username, checkUsername] = useState("");
  // const [password, checkPassword] = useState("");

  return (
    <div>
      <h2>Fitness Tracker</h2>
      <div className="outerForm">
        <h2>LOG IN</h2>
        <div className="form">
          <form>
            <input
              required
              type="text"
              name="username"
              placeholder="username"
              // onChange={(e) => checkUsername(e.target.value)}
            />
            <input
              required
              type="password"
              name="password"
              placeholder="password"
              // onChange={(e) => checkPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
      {/* <Link to="/register">Don't have an account? Sign Up</Link> */}
    </div>
  );
};

export default Home;
