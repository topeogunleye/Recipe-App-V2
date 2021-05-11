import React, { Component, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { MoonIcon } from '@heroicons/react/solid';

class ThemeToggle extends Component {
  static contextType = ThemeContext;
  render() {
    const { toggleTheme } = this.context;
    return (
      <ThemeContext.Consumer>
        {(context) => {
          const { isLightTheme, light, dark } = context;
          const theme = isLightTheme ? light : dark;
          return (
            <button
              onClick={toggleTheme}
              className="focus:outline-none my-auto rounded-full w-10 h-10 grid place-items-center ml-2.5"
              style={{ background: theme.bg, color: theme.syntax }}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default ThemeToggle;
