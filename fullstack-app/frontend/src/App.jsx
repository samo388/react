import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user } = useContext(AuthContext);

  return user ? <Dashboard /> : <Login />;
}

export default App;
