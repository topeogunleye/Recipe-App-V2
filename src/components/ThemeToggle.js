import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { MoonIcon } from '@heroicons/react/solid';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  const themeAria = isLightTheme
    ? 'Click to Enable Dark Mode'
    : 'Click to Enable Light Mode';

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none my-auto rounded-full w-10 h-10 grid place-items-center ml-2.5"
      style={{ background: theme.bg, color: theme.syntax }}
      title={themeAria}
      aria-label={themeAria}
    >
      <MoonIcon className="h-5 w-5" />
    </button>
  );
};

export default ThemeToggle;
