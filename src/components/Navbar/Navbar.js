import React, { useState, useEffect, useContext, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { ThemeContext } from '../../contexts/ThemeContext';

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

function Navbar() {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  let domNode = useClickOutside(() => {
    setSidebar(false);
  });

  return (
    <>
      <IconContext.Provider value={{ color: theme.syntax }}>
        <div
          className="navbar"
          style={{ background: theme.ui, color: theme.syntax }}
          ref={domNode}
        >
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          className={sidebar ? 'nav-menu active' : 'nav-menu'}
          style={{ background: theme.bg, color: theme.syntax }}
        >
          <ul className="nav-menu-items">
            <li
              className="navbar-toggle"
              style={{ background: theme.bg, color: theme.syntax }}
            >
              {/* <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link> */}
            </li>
            <div className="w-full grid place-items-start">
              <Link
                to="./loginsignup/"
                className="button-primary signin-button ml-8 mb-12 "
                id="nav-desktop-signin-button"
                title="Sign Up / Log in"
                aria-label="Sign Up / Log in"
                href="/login#signup"
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
