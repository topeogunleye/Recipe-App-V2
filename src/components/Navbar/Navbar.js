import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import PropTypes from 'prop-types';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import SidebarData from './SidebarData';
import './Navbar.css';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import logo from '../../logo.png';
import DarkToggleSideBar from '../theme-toggle/DarkToggleSideBar';
import { auth } from '../../firebase/firebase.utils';

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg } = theme.mode;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const domNode = useClickOutside(() => {
    setSidebar(false);
  });

  const user = auth.currentUser;

  return (
    <>
      <IconContext.Provider value={{ color: syntax }}>
        <div
          className="navbar transition-all duration-1000 ease-out"
          style={{ background: ui, color: syntax }}
        >
          <button
            type="button"
            className="menu-bars ml-4 md:ml-8 text-2xl sm:text-3xl"
            onClick={() => {}}
            aria-label="Menu"
          >
            <FaIcons.FaBars onClick={showSidebar} />
          </button>
          <Link to="/">
            <button
              type="button"
              className="font-black text-2xl logo-signature mx-auto logo main"
              onClick={refresh}
              onKeyDown={refresh}
              tabIndex={0}
            >
              <img src={logo} alt="logo" className="w-20 lg:ml-28" />
            </button>
          </Link>
        </div>
        <nav
          className={sidebar ? 'nav-menu active' : 'nav-menu'}
          style={{ background: bg, color: syntax }}
          ref={domNode}
        >
          <ul className="nav-menu-items mb-10 xs:mb-24 sm:mb-32">
            <div className="w-full grid place-items-start transition-all duration-1000 ease-out">
              <div className="mt-4 mb-8 flex justify-items-center items-center">
                <Link to="/">
                  <button
                    type="button"
                    className="font-black text-2xl logo-signature mx-auto mt-4 logo"
                    onClick={refresh}
                    onKeyDown={refresh}
                    tabIndex={0}
                  >
                    <img src={logo} alt="logo" className="w-20" />
                  </button>
                </Link>
                <div className="xl:hidden mt-6">
                  <DarkToggleSideBar />
                </div>
              </div>
              {currentUser ? (
                <div className="mx-auto my-auto cursor-pointer">
                  <img
                    src={user && user.photoURL}
                    alt=""
                    className="w-14 mx-auto my-5 rounded-full"
                  />
                  <div>{user && user.displayName}</div>
                </div>
              ) : (
                <Link
                  to="/loginsignup/"
                  className="button-primary signin-button mx-auto mb-12 mt-4 "
                  id="nav-desktop-signin-button"
                  title="Sign Up / Log in"
                  aria-label="Sign Up / Log in"
                >
                  Sign Up / Log In
                </Link>
              )}
            </div>
            {SidebarData.map((item) => (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="item-title">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="dev-info transition-all duration-1000 ease-out">
            <div className="w-60 text-center my-6">
              {currentUser ? (
                <button
                  type="button"
                  className="option"
                  onClick={() => auth.signOut()}
                >
                  SIGN OUT
                </button>
              ) : (
                <Link className="option" to="loginsignup/">
                  SIGN IN
                </Link>
              )}
            </div>
            <p className="text-xs ml-8 ">
              <FaIcons.FaCopyright className="inline-block" />
              2021 by Temitope Ogunleye
            </p>

            <div className="social-media">
              <a
                href="https://github.com/topeogunleye"
                className="fa fa-github"
                target="blank"
                aria-label="GitHub"
              >
                <FaIcons.FaGithub />
              </a>
              <a
                href="https://web.facebook.com/topeogunleye21"
                className="fa fa-facebook"
                target="blank"
                aria-label="Facebook"
              >
                <FaIcons.FaFacebook />
              </a>
              <a
                href="https://twitter.com/topeogunleye21"
                className="fa fa-twitter"
                target="blank"
                aria-label="Twitter"
              >
                <FaIcons.FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/ogunleye"
                className="fa fa-linkedin"
                target="blank"
                aria-label="LinkedIn"
              >
                <FaIcons.FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/topeogunleye1/"
                className="fa fa-instagram"
                target="blank"
                aria-label="Instagram"
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

Navbar.propTypes = {
  refresh: PropTypes.func.isRequired,
};

export default Navbar;
