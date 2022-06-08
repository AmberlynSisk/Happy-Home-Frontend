import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR, useNavigate } from "react-router-dom";
import HHLogo from "../images/Happy.png";
import { useAppContext } from "../../Context";
import Cookies from "js-cookie";

const Sidebar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, setCurrentUser, logout } = useAppContext();

  const handleLogout = () => {
    if (Cookies.get("username")) {
      setLoggedIn(false);
      setCurrentUser(null);
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    if (Cookies.get("username")) {
      setLoggedIn(true);
    }
  });

  return (
    <>
      {loggedIn ? (
        <aside
          className="SidebarContainer"
          isOpen={isOpen}
          onClick={toggle}
          style={{ top: isOpen ? "0" : "-100%" }}
        >
          <div className="Icon" onClick={toggle}>
            <FaTimes />
          </div>
          <div className="SidebarWrapper">
            <ul className="SidebarMenu">
              <LinkR className="SidebarLink" to="/" onClick={toggle}>
                <img src={HHLogo} />
              </LinkR>
              <LinkR className="SidebarLink" to="/calendar" onClick={toggle}>
                Calendar
              </LinkR>
              <LinkR className="SidebarLink" to="/lists" onClick={toggle}>
                Lists
              </LinkR>
              <LinkR className="SidebarLink" to="/member" onClick={toggle}>
                Change User
              </LinkR>
              <LinkR
                className="SidebarLink nav-btn"
                to="/profile"
                onClick={toggle}
              >
                Profile
              </LinkR>
              <span className="SidebarLink nav-btn" onClick={handleLogout}>
                Logout
              </span>
            </ul>
          </div>
        </aside>
      ) : (
        <aside
          className="SidebarContainer"
          isOpen={isOpen}
          onClick={toggle}
          style={{ top: isOpen ? "0" : "-100%" }}
        >
          <div className="Icon" onClick={toggle}>
            <FaTimes />
          </div>
          <div className="SidebarWrapper">
            <ul className="SidebarMenu">
              <LinkS className="SidebarLink" to="home" onClick={toggle}>
                <img src={HHLogo} />
              </LinkS>
              <LinkS className="SidebarLink" to="about" onClick={toggle}>
                About Us
              </LinkS>
              <LinkS className="SidebarLink" to="how" onClick={toggle}>
                How It Works
              </LinkS>
              <LinkR
                className="SidebarLink nav-btn"
                to="/login"
                onClick={toggle}
              >
                Login
              </LinkR>
              <LinkR
                className="SidebarLink nav-btn"
                to="/signup"
                onClick={toggle}
              >
                Sign Up
              </LinkR>
            </ul>
          </div>
        </aside>
      )}{" "}
    </>
  );
};

export default Sidebar;
