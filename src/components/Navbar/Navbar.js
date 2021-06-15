import React, { useState, useEffect, useContext, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../logo.png';

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

function Navbar({ refresh }) {
  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, icon, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  let domNode = useClickOutside(() => {
    setSidebar(false);
  });

  const [signedIn, setSignedIn] = useState(false);

  return (
    <>
      <IconContext.Provider value={{ color: syntax }}>
        <div className="navbar" style={{ background: ui, color: syntax }}>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to="/">
            <div
              className="font-black text-2xl logo-signature mx-auto logo main"
              onClick={refresh}
            >
              <img src={logo} alt="logo" className="w-20 lg:ml-28" />
            </div>
          </Link>
        </div>
        <nav
          className={sidebar ? 'nav-menu active' : 'nav-menu'}
          style={{ background: bg, color: syntax }}
          ref={domNode}
        >
          <ul className="nav-menu-items">
            {/* <li
              className="navbar-toggle"
              style={{ background: bg, color: syntax }}
            >
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
            <div
              className="w-full grid place-items-start "
              onClick={() => toggleAuth()}
            >
              <div className="mt-4 mb-8">
                <Link to="/">
                  <div
                    className="font-black text-2xl logo-signature mx-auto mt-4 logo"
                    onClick={refresh}
                  >
                    <img src={logo} alt="logo" className="w-20" />
                  </div>
                </Link>
              </div>
              <Link
                to="/loginsignup/"
                className="button-primary signin-button mx-auto mb-12 mt-4 "
                id="nav-desktop-signin-button"
                title="Sign Up / Log in"
                aria-label="Sign Up / Log in"
              >
                Sign Up / Log In
              </Link>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="item-title">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="dev-info absolute bottom-0">
            <div className="w-60 text-center my-6">
              {isAuthenticated ? 'Logged in' : 'Logged out'}
            </div>
            <p className="text-xs ml-8 ">
              <FaIcons.FaCopyright className="inline-block" /> 2021 by Temitope
              Ogunleye
            </p>

            <div className="social-media">
              <a
                href="https://github.com/topeogunleye
                    "
                className="fa fa-github"
                target="blank"
              >
                <FaIcons.FaGithub />
              </a>
              <a
                href="https://web.facebook.com/topeogunleye21
                "
                className="fa fa-facebook"
                target="blank"
              >
                <FaIcons.FaFacebook />
              </a>
              <a
                href="https://twitter.com/temi_web
                "
                className="fa fa-twitter"
                target="blank"
              >
                <FaIcons.FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/ogunleye
                "
                className="fa fa-linkedin"
                target="blank"
              >
                <FaIcons.FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/topeogunleye1/
                "
                className="fa fa-instagram"
                target="blank"
              >
                <FaIcons.FaInstagram />
              </a>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
