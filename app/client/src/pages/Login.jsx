import "../styles/login.css";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import currentUserContext from "../context/current-user-context";

import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/login/SignUpForm";

export default function LoginPage() {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [hasAcc, setHasAcc] = useState(true);
  const [username, setUsername] = useState("");
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //
      const endpoint = hasAcc ? "/api/login" : "/api/register";
      const data = hasAcc ? { email, password } : { username, email, password };
      const response = await axios.post(endpoint, data);
      const token = response.data.token;
      const currUser = response.data.user;
      //
      console.log("New User logged in: ", response.data);
      setCurrentUser(currUser);
      document.cookie = `token=${token}; path=/; max-age=86400`;
      navigate("/homepage");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {/* Left Column - Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="glass-text welcome-title">Welcome Back</h1>
            <p className="welcome-subtitle">
              Continue your journey of self-reflection and growth with
              SpaceScribe
            </p>
            {/* <div className="social-icons">
              <a href="#" className="social-icon">
                📘
              </a>
              <a href="#" className="social-icon">
                🐦
              </a>
              <a href="#" className="social-icon">
                📷
              </a>
              <a href="#" className="social-icon">
                📺
              </a>
            </div> */}
          </div>
        </div>

        {/* Right Column - Form Section */}
        <div className="form-section">
          <div className="form-wrapper">
            <h2 className="form-title">{hasAcc ? "Sign in" : "Sign up"}</h2>
            {hasAcc ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setHasAcc={setHasAcc}
                handleSubmit={handleSubmit}
                error={error}
              />
            ) : (
              <SignUpForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setHasAcc={setHasAcc}
                goal={goal}
                setGoal={setGoal}
                handleSubmit={handleSubmit}
                error={error}
              />
            )}
            <div className="terms-privacy">
              <p>
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
