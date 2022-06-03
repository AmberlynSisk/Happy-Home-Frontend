import { useState } from "react";
import { Link as LinkR, useNavigate } from "react-router-dom";
import HappyLogo from "../images/Happy.png";
import { useAppContext } from "../../Context";
import Cookies from "js-cookie";

const Signup = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser, login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Error: The passwords must match");
    } else {
      fetch("http://127.0.0.1:5000/user/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === "Error: The username is already registered.") {
            setError(true);
            setErrorMessage("Error: The username is already registered.");
          } else if (res === "Error: The email is already registered.") {
            setError(true);
            setErrorMessage("Error: The email is already registered.");
          } else {
            setError(false);
            setErrorMessage("");
            Cookies.set("username", username);
            setCurrentUser(res.id);
            window.localStorage.setItem("currentId", JSON.stringify(res.id));
            navigate("/member");
          }
        })
        .then(() => {
          login();
        })
        .catch((error) => {
          console.log("Error with creating an account", error);
          setError(true);
          setErrorMessage("Error setting up your account, please try again!");
        });
    }
  };

  return (
    <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
          <LinkR className="signupLogo" to="/">
            <img src={HappyLogo} alt="HappyHomeLogo" />
          </LinkR>
        </div>
        <div className="signupRight">
          <form className="signupBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="signupInput"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="signupInput"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="signupInput"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="signupInput"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="signupButton">
              Sign Up
            </button>
            <LinkR className="loginLink" to="/login">
              Already Registered? Login Here.
            </LinkR>
          </form>

          <h6
            className="errorMessage"
            style={{ visibility: error ? "visible" : "hidden" }}
          >
            {errorMessage}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Signup;
