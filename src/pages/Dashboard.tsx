import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

const features: FeatureCard[] = [
  {
    title: "Battle Mode",
    description: "Fire the same prompt at multiple models simultaneously and compare responses side by side.",
    icon: "⚔️",
  },
  {
    title: "Single Mode",
    description: "Send tasks to one model at a time — no comparison needed, no extra cost.",
    icon: "🎯",
  },
  {
    title: "Merge Engine",
    description: "Reconcile conflicting edits from different models into a single clean patch.",
    icon: "🧩",
    comingSoon: true,
  },
  {
    title: "Analytics",
    description: "Track win rates, costs, and latency across models over time.",
    icon: "📊",
    comingSoon: true,
  },
  {
    title: "Adaptive Routing",
    description: "ML-powered model recommendations based on your usage history.",
    icon: "🧠",
    comingSoon: true,
  },
  {
    title: "Remote Trigger",
    description: "Submit tasks and check status from your phone via a lightweight client.",
    icon: "📱",
    comingSoon: true,
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("parallax_user");
    if (!user) {
      navigate("/");
      return;
    }
    setUsername(user);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("parallax_user");
    navigate("/");
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-left">
          <svg viewBox="0 0 40 40" fill="none" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#6C5CE7" />
            <path d="M12 28V12h4.5a5.5 5.5 0 013.89 1.61A5.5 5.5 0 0122 17.5a5.5 5.5 0 01-1.61 3.89A5.5 5.5 0 0116.5 23H14.5v5H12zm2.5-7.5h2a3 3 0 002.12-.88A3 3 0 0019.5 17.5a3 3 0 00-.88-2.12A3 3 0 0016.5 14.5H14.5v6z" fill="white" />
            <path d="M26 20.5L30 28h-2.5l-1-1.8h-5l-1 1.8H18l4-7.5h4zm-1.5 2.5l-1.5-2.7-1.5 2.7h3z" fill="white" />
          </svg>
          <span className="dash-brand">Parallax</span>
        </div>

        <div className="dash-header-right">
          <span className="dash-user">Hey, {username}!</span>
          <button className="dash-logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="dash-content">
        <div className="dash-welcome">
          <h1 className="dash-welcome-title">
            Welcome to Parallax
          </h1>
          <p className="dash-welcome-sub">
            A self-optimizing, multi-model IDE for competitive code generation.
            Let's build something great.
          </p>
        </div>

        {/* Feature grid */}
        <div className="dash-grid">
          {features.map((f) => (
            <div key={f.title} className={`dash-card ${f.comingSoon ? "coming-soon" : ""}`}>
              <div className="dash-card-icon">{f.icon}</div>
              <div className="dash-card-body">
                <h3 className="dash-card-title">
                  {f.title}
                  {f.comingSoon && <span className="dash-badge">Soon</span>}
                </h3>
                <p className="dash-card-desc">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
