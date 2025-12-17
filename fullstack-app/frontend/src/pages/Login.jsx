import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await loginApi({ email, password });

      // save token in context + localStorage
      login(res.data.token);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? <div className="spinner"></div> : "Login"}
        </button>
      </div>
    </div>
  );
}
