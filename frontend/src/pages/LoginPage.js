import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import authService from "./../services/auth.services";
import logo from "../assest/logo.png";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // axios.post(`${API_URL}/auth/login`, requestBody

    authService
      .login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="limaster">
      <div className="LoginPage">
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </div>

            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </div>

            <button type="submit">Login</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Don't have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
        <div className="logo-container">
          <img
            className="biglogo"
            src={logo}
            alt="logo"
            style={{ width: "500px", height: "auto" }}
          ></img>
        </div>
      </div>
      <footer>ChriSiebels</footer>
    </div>
  );
}

export default LoginPage;
