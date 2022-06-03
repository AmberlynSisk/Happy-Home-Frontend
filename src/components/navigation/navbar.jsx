import { animateScroll as scroll, Link as LinkS } from 'react-scroll';
import { Link as LinkR, useNavigate } from 'react-router-dom';
import HappyLogo from '../images/Happy.png';
import { useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useAppContext } from '../../Context';
import Cookies from 'js-cookie';


const Navbar = () => {
  const navigate = useNavigate();
  const {loggedIn, setLoggedIn, setCurrentUser, logout} = useAppContext();

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  const handleLogout = () => {
      if(Cookies.get('username')) {
          setLoggedIn(false);
          setCurrentUser(null);
          logout();
          navigate('/');
      } 
  }


  useEffect(() => {
    if(Cookies.get('username')) {
        setLoggedIn(true);
    }
  })
 
  return (
    <>
    {loggedIn ?  (
        <nav>
            <div className="nav-container">
                <LinkR className="nav-logo" to="/">
                    <img src={HappyLogo} alt="Logo" />
                </LinkR>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <LinkR className="nav-link" to="/calendar">
                            Calendar
                        </LinkR>
                    </li>
                    <li className="nav-item">
                        <LinkR className="nav-link" to="/lists">
                            Lists
                        </LinkR>
                    </li>
                    <li className="nav-item">
                        <LinkR className="nav-link" to="/member">
                            Change User
                        </LinkR>
                    </li>
                    <li className="nav-item">
                        <LinkR className="nav-link" to="/profile">
                            <BsPersonCircle style={{fontSize: "1.8em"}} />
                        </LinkR>
                    </li>
                    <li className="nav-item">
                        <span className="nav-btn" onClick={handleLogout}>
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
        ) : (
        <nav>
            <div className="nav-container">
                <LinkR className="nav-logo" to="/" onClick={toggleHome}>
                    <img src={HappyLogo} alt="Logo" />
                </LinkR>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <LinkS className="nav-link" to="about" smooth={true} duration={500} spy={true} exact='true' offset={-125}>
                            About Us
                        </LinkS>
                    </li>
                    <li className="nav-item">
                        <LinkS className="nav-link" to="how" smooth={true} duration={500} spy={true} exact='true' offset={-125}>
                            How It Works
                        </LinkS>
                    </li>
                    <li className="nav-item">
                        <LinkR className="nav-btn" to="/login">
                            Login
                        </LinkR>
                    </li>
                    <li className="nav-item">
                        <LinkR className="nav-btn" to="/signup">
                            Sign Up
                        </LinkR>
                    </li>
                </ul>
            </div>
        </nav>)}    
    </>
  )
}

export default Navbar