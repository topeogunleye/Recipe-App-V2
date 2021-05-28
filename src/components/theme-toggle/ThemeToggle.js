import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import { MoonIcon } from '@heroicons/react/solid';

const ThemeToggle = () => {
  const setTheme = (darkMode) => {
    const isDark = darkMode.mode.isDark;
    darkMode.dispatch(!isDark);
  };

  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, icon, isDark } = theme.mode;

  const themeAria = isDark
    ? 'Click to Enable Light Mode'
    : 'Click to Enable Dark Mode';

  return (
    <button
      onClick={() => setTheme(theme)}
      style={{ background: bg, color: syntax }}
      className="focus:outline-none my-auto rounded-full w-10 h-10 grid place-items-center ml-2.5"
      title={themeAria}
      aria-label={themeAria}
    >
      <MoonIcon className="h-5 w-5" />
    </button>
  );
};

export default ThemeToggle;

// const { toggleTheme } = useContext(ThemeContext);
// const { isLightTheme, light, dark } = useContext(ThemeContext);
// const theme = isLightTheme ? light : dark;
// const themeAria = isLightTheme
//   ? 'Click to Enable Dark Mode'
//   : 'Click to Enable Light Mode';
