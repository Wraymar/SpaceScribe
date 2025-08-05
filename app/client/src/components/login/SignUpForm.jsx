function SignUpForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  setHasAcc,
  goal,
  setGoal,
  handleSubmit,
  error,
}) {
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          <span className="eye-icon">👁</span>
        </div>

        <div className="goal-container">
          <p className="goal-label">Set a goal to achieve when journaling:</p>
          <input
            type="text"
            placeholder="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-btn">
          Sign up now
        </button>

        <div className="form-toggle">
          <p>
            Already have an account?
            <button
              type="button"
              onClick={() => {
                setHasAcc(true);
              }}
              className="switch-type"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
