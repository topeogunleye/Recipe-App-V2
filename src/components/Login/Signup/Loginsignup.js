const Loginsignup = () => {
  return (
    <div className="login-splash grid place-items-center container">
      <h1 className="new-login text-4xl font-light">
        Your recipes are waiting
      </h1>
      <h2 className="login-splash-subheading">
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
      <div className="legalese">
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
  );
};

export default Loginsignup;
