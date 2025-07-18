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
      <p>
        Don't have an account?
        <span>
          <button
            onClick={() => {
              setHasAcc(false);
            }}
            className="switch-type"
          >
            Click Here!
          </button>
        </span>
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
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
          <span className="eye-icon">👁</span>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-btn">
          SIGN IN
        </button>
      </form>
    </>
  );
}

export default LoginForm;
