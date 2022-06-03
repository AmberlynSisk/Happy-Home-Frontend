import { useAppContext } from "../../Context";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import LIHero from "./loggedIn/hero";
import Navbar from "../navigation/navbar";
import LOHero from "./loggedOut/hero";
import About from "./loggedOut/about";
import How from "./loggedOut/how";


const Home = () => {
  const { loggedIn, setCurrentUser } = useAppContext();

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
          <Navbar />
          <LOHero />
          <About />
          <How />
        </>
      )}
    </>
  );
};

export default Home;
