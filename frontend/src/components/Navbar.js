import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import "../pages/Home.css";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // Hook for react-router
  let navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedRoute = event.target.value;
    navigate(selectedRoute);
  };

  return (
    <div>
      <header className="constant-header">
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>

          {isLoggedIn && (
            <>
              <select name="Tours" onChange={handleSelectChange}>
                <option value="">Select tour option</option>
                <option value="/tours">Tours</option>
                <option value="Tours/New">New Tour</option>
              </select>

              <button onClick={logOutUser}>Logout</button>
              <span>{user && user.name}</span>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                {" "}
                <button>Sign Up</button>{" "}
              </Link>
              <Link to="/login">
                {" "}
                <button>Login</button>{" "}
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
