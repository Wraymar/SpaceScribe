import "../styles/login.css";

export default function LoginForm() {
  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <h2>Welcome to SpaceSribe</h2>
        <p>Have an account?</p>

        <form className="login-form">
          <input type="text" placeholder="Username" />
          <div className="password-container">
            <input type="password" placeholder="Password" />
            <span className="eye-icon">👁</span>
          </div>

          <button className="login-btn">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}
