import { useAppContext } from "../../Context";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LIHero from "./loggedIn/hero";
import Navbar from "../navigation/navbar";
import LOHero from "./loggedOut/hero";
import About from "./loggedOut/about";
import How from "./loggedOut/how";
import Sidebar from "../navigation/sidebar";

const Home = () => {
  const { loggedIn, setCurrentUser } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen)
  };

  const renderUserId = () => {
    if (Cookies.get("username")) {
      const userId = window.localStorage.getItem("currentId");
      setCurrentUser(userId);
    }
  };

  useEffect(() => {
    renderUserId();
  });

  return (
    <>
      {loggedIn ? (
        <>
          <LIHero />
        </>
      ) : (
        <>
          <Sidebar isOpen={isOpen} toggle={toggle}/>
          <Navbar toggle={toggle}/>
          <LOHero />
          <About />
          <How />
        </>
      )}
    </>
  );
};

export default Home;
