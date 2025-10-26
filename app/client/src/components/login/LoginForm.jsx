function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  setHasAcc,
  handleSubmit,
  error,
}) {
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <span className="eye-icon">👁</span> */}
        </div>

        {/* runs only if the handlesubmit fails */}
        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-btn">
          Sign in now
        </button>

        <div className="form-toggle">
          <p>
            Don't have an account?
            <button
              type="button"
              onClick={() => {
                setHasAcc(false);
              }}
              className="switch-type"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
