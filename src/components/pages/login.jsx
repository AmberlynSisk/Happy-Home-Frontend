import { useEffect, useState } from "react";
import { Link as LinkR, useNavigate } from "react-router-dom";
import HappyLogo from "../images/Happy.png";
import { useAppContext } from "../../Context";
import Cookies from "js-cookie";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setCurrentUser, login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("Error: All fields must be completed");
    } else {
      fetch("https://happyhome-api.herokuapp.com/user/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === "User NOT verified") {
            setError(true);
            setErrorMessage("Error: Account could not be verified");
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
          console.log("Error with logging in, please try again.", error);
          setError(true);
          setErrorMessage("Error with logging in, please try again.");
        });
    }
  };

  useEffect(() => {
    setError(false);
    setErrorMessage("");
  }, [username, password]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <LinkR className="loginLogo" to="/">
            <img src={HappyLogo} alt="HappyHomeLogo" />
          </LinkR>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Username"
              className="loginInput"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="loginButton">
              Log In
            </button>
            <LinkR className="loginLink" to="/signup">
              Not A Member, Yet? Sign Up Here.
            </LinkR>
          </form>

          <h3
            className="errorMessage"
            style={{ visibility: error ? "visible" : "hidden" }}
          >
            {errorMessage}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
