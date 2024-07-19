import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoEscapade from "../components/LogoEscapade";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://city-info-server.netlify.app/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
      navigate("/user");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login__body">
      <header className="login__header">
        <LogoEscapade />
      </header>
      <div className="login">
        <main className="login__main">
          <h1>Bienvenue !</h1>
          <p>Pour continuer, connectez-vous à votre espace personnel</p>
          <form className="login__form" onSubmit={handleLogin}>
            <label htmlFor="email">Entrez votre adresse mail :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean@mail.com"
              required
            />
            <label htmlFor="password">Saisissez votre mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="la frite belge"
              required
            />
            <button className="form__button" type="submit" disabled={loading}>
              {loading ? "Patientez..." : "Se connecter"}
            </button>
            <button className="form__exit" type="button">
              Retourner à l'accueil
            </button>
          </form>
          <p>{message}</p>
        </main>
      </div>
    </div>
  );
}

export default Login;
