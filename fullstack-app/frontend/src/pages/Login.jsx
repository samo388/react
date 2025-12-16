import { useState, useContext } from "react";
import { login as loginApi } from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginApi({ email, password });
      login(res.data.token);
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? <div className="spinner"></div> : "Login"}
        </button>
      </div>
    </div>
  );
}
