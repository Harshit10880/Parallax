import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);

    // Simulate a brief "auth" delay
    await new Promise((r) => setTimeout(r, 600));

    // Store username in session
    localStorage.setItem("parallax_user", username.trim());

    setIsLoading(false);
    navigate("/dashboard");
  }

  return (
    <div className="login-screen">
      {/* Decorative background elements */}
      <div className="login-bg-orbe orbe-1" />
      <div className="login-bg-orbe orbe-2" />
      <div className="login-bg-grid" />

      <div className="login-card">
        {/* Branding */}
        <div className="login-brand">
          <div className="login-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#6C5CE7" />
              <path
                d="M12 28V12h4.5a5.5 5.5 0 013.89 1.61A5.5 5.5 0 0122 17.5a5.5 5.5 0 01-1.61 3.89A5.5 5.5 0 0116.5 23H14.5v5H12zm2.5-7.5h2a3 3 0 002.12-.88A3 3 0 0019.5 17.5a3 3 0 00-.88-2.12A3 3 0 0016.5 14.5H14.5v6z"
                fill="white"
              />
              <path
                d="M26 20.5L30 28h-2.5l-1-1.8h-5l-1 1.8H18l4-7.5h4zm-1.5 2.5l-1.5-2.7-1.5 2.7h3z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="login-title">Parallax</h1>
          <p className="login-subtitle">Multi-Model IDE</p>
        </div>

        {/* Welcome text */}
        <h2 className="login-heading">Welcome back</h2>
        <p className="login-description">
          Enter your name to launch the dashboard
        </p>

        {/* Login form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className={`login-input-wrap ${isFocused || username ? "active" : ""}`}>
            <input
              type="text"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={!username.trim() || isLoading}
          >
            {isLoading ? (
              <span className="login-btn-loading">
                <span className="spinner" />
                Starting…
              </span>
            ) : (
              "Launch Parallax →"
            )}
          </button>
        </form>

        <p className="login-footer-text">
          Bring your own API keys • Full control over your spend
        </p>
      </div>
    </div>
  );
}

export default Login;
