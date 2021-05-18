import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { ThemeContext } from '../../contexts/ThemeContext';

function Navbar() {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: theme.syntax }}>
        <div
          className="navbar"
          style={{ background: theme.ui, color: theme.syntax }}
        >
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          className={sidebar ? 'nav-menu active' : 'nav-menu'}
          style={{ background: theme.bg, color: theme.syntax }}
        >
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li
              className="navbar-toggle"
              style={{ background: theme.bg, color: theme.syntax }}
            >
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
