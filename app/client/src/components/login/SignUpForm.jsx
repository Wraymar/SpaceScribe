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
          {error && <p className="error">{error}</p>}

          <p>Set a goal to achieve when journaling:</p>
          <input
            type="text"
            placeholder="Goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button type="submit" className="login-btn">
            SIGN UP
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUpForm;
