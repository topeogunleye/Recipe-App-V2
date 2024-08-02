import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLightTheme: true,
      light: {
        syntax: '#374151', ui: ' #fff', bg: ' #d1d5db', icon: '#374151',
      },
      dark: {
        syntax: '#fff', ui: ' #374151', bg: ' #111827', icon: '#111827',
      },
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({ isLightTheme: !prevState.isLightTheme }));
  };

  render() {
    const { children } = this.props;
    return (
      <ThemeContext.Provider
        value={{ ...this.state, toggleTheme: this.toggleTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContextProvider;
