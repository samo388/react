import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.className = dark ? "dark" : "";
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard 🔐</h2>
        <p>You are logged in</p>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        <br /><br />

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
