import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import './loginsignup.css';
import logo from '../../logo.png';
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from '../../firebase/firebase.utils';
import ThemeToggleLogin from '../../components/theme-toggle/ThemeToggleLogin';

const Loginsignup = () => {
  const theme = useContext(DarkModeContext);
  const { syntax, ui } = theme.mode;

  return (
    <div
      className="w-screen transition-all duration-1000 ease-out"
      style={{ background: ui, color: syntax }}
    >
      <div
        className="absolute top-5 right-10
          "
        style={{ background: ui, color: syntax }}
      >
        <ThemeToggleLogin
          className="cursor-pointer focus:outline-none"
          id="random"
        />
      </div>
      <div
        className="new-login h-screen mx-auto container xl:w-screen transition-all duration-1000 ease-out"
        style={{ background: ui, color: syntax }}
      >
        <Link to="/">
          <div className="font-black text-2xl logo-signature mx-auto logo login">
            <img src={logo} alt="logo" className="w-20" />
          </div>
        </Link>

        <div
          className="login-splash grid place-items-center relative transition-all duration-1000 ease-out"
          style={{ background: ui, color: syntax }}
        >
          <h1 className="new-login text-4xl font-light">
            Your recipes are waiting
          </h1>
          <h2
            className="login-splash-subheading pb-6"
            style={{ color: syntax }}
          >
            Connect to customize your recipe discovery.
          </h2>
          <ul className="login-buttons container">
            <li className>
              <button
                title="Connect with Facebook"
                aria-label="Connect with Facebook"
                className="button facebook btn-facebook"
                type="button" // Add the type attribute with the value "button"
              >
                <span>Connect with Facebook</span>
              </button>
            </li>
            <li className>
              <button
                title="Connect with Google"
                aria-label="Connect with Google"
                className="button google btn-google"
                onClick={signInWithGoogle}
                type="button"
              >
                <span>Connect with Google</span>
              </button>
            </li>
            <li className>
              <button
                title="Connect with Github"
                aria-label="Connect with Github"
                className="button github btn-github"
                onClick={signInWithGithub}
                type="button"
              >
                <span>Connect with Github</span>
              </button>
            </li>
            <li className>
              <button
                title="Connect with Twitter"
                aria-label="Connect with Twitter"
                className="button twitter btn-twitter"
                onClick={signInWithTwitter}
                type="button"
              >
                <span>Connect with Twitter</span>
              </button>
            </li>
          </ul>
          <div className="legalese ">
            <span className="text-wrapper">
              By connecting, you agree to our
              {' '}
              <button
                className="link-button"
                onClick={() => window.open('/terms', '_blank')}
                type="button"
              >
                Terms of Use
              </button>
              {' '}
              and
              {' '}
              <button
                className="link-button"
                onClick={() => window.open('/privacy', '_blank')}
                type="button"
              >
                Privacy Notice
              </button>
            </span>
          </div>
        </div>
      </div>
      <button
        className="close-link"
        onClick={() => {
          window.location.href = '/';
        }}
        title="Close &amp; Use Recipa"
        aria-label="Close &amp; Use Recipa"
        style={{
          color: syntax,
          textDecoration: 'underline',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
        type="button"
      >
        Close &amp; Use Recipa
      </button>
    </div>
  );
};

export default Loginsignup;
