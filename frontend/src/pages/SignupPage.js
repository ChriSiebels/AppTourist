import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "./../services/auth.services";
import logo from "../assest/logo.png";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state

    // axios.post(`${API_URL}/auth/signup`, requestBody)

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="limaster">
      <div className="SignupPage">
        <div className="signup-content">
          <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
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

              <div className="input-container">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
                />
              </div>

              <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
          </div>

          <div className="logo-container">
            <img
              className="biglogo"
              src={logo}
              alt="logo"
              style={{ width: "500px", height: "auto" }}
            />
          </div>
        </div>

        <footer>ChriSiebels</footer>
      </div>
    </div>
  );
}

export default SignupPage;
