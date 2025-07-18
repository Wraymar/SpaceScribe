function SignUpForm({
  username,
  setUsername,
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
      <button
        onClick={() => {
          setHasAcc(true);
        }}
        className="switch-type"
      >
        Back to Login
      </button>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
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

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            SIGN UP
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
