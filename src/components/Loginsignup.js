import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Loginsignup = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  return (
    <div
      className="w-screen "
      style={{ background: theme.ui, color: theme.syntax }}
    >
      <div
        className="new-login h-screen mx-auto container xl:w-screen"
        style={{ background: theme.ui, color: theme.syntax }}
      >
        <div
          className="login-splash grid place-items-center relative"
          style={{ background: theme.ui, color: theme.syntax }}
        >
          <div
            className="absolute top-0 right-0
          "
            style={{ background: theme.ui, color: theme.syntax }}
          >
            <ThemeToggle
              className="cursor-pointer focus:outline-none"
              id="random"
            />
          </div>
          <div className="font-black text-2xl my-16 logo-signature">Recipa</div>
          <h1 className="new-login text-4xl font-light">
            Your recipes are waiting
          </h1>
          <h2
            className="login-splash-subheading"
            style={{ color: theme.syntax }}
          >
            Connect to customize your recipe discovery.
          </h2>
          <ul className="login-buttons container">
            <li className>
              <button
                title="Connect with Facebook"
                aria-label="Connect with Facebook"
                className="button facebook btn-facebook"
              >
                <span>Connect with Facebook</span>
              </button>
            </li>
            <li className>
              <button
                title="Connect with Google"
                aria-label="Connect with Google"
                className="button google btn-google"
              >
                <span>Connect with Google</span>
              </button>
            </li>
            <li className>
              <button
                title="Connect with Apple"
                aria-label="Connect with Apple"
                className="button apple btn-apple"
              >
                <span>Connect with Apple</span>
              </button>
            </li>
            <li className>
              <button
                title="Connect with Email"
                aria-label="Connect with Email"
                className="button email btn-email"
              >
                <span>Connect with Email</span>
              </button>
            </li>
          </ul>
          <div className="legalese ">
            <span className="text-wrapper">
              By connecting, you agree to our{' '}
              <a
                href="/terms"
                title="Terms of Use"
                aria-label="Terms of Use"
                target="_blank"
                rel="noopener"
              >
                Terms of Use
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                title="Privacy Notice"
                aria-label="Privacy Notice"
                target="_blank"
                rel="noopener"
              >
                Privacy Notice
              </a>
            </span>
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="close-link"
        role="button"
        href="#"
        title="Close &amp; Use Recipa"
        aria-label="Close &amp; Use Recipa"
        style={{ color: theme.syntax }}
      >
        Close &amp; Use Recipa
      </Link>
    </div>
  );
};

export default Loginsignup;
