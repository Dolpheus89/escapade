import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./User.css";
import Menu from "../components/Menu";
import burgerMenu from "../assets/svg/burger-menu.svg";
import LogoEscapade from "../components/LogoEscapade";
import UserCardList from "../components/UserCardList";
import Trophy from "../components/Trophy";
import { AuthContext } from "../contexts/AuthContext";

function User() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => setMenuOpen(!menuOpen);
  const handleCloseMenu = () => setMenuOpen(false);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the login page or any other route
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://city-info-server.netlify.app/user",
          {
            headers: { Authorization: token },
          }
        );
        setData(response.data);
        setLoading(false);
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.error("Error fetching protected data", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user">
      <header className="user-header">
        <button type="button" onClick={handleMenuClick} onKeyDown={() => {}}>
          <img
            className="user-header__icon"
            src={burgerMenu}
            alt="Menu burger"
          />
        </button>
        <LogoEscapade />
      </header>
      <main className="user-main">
        <h1 className="user-main__title">Bonjour {data.name}</h1>
        <h2 className="user-main__subtitle">Vos escapades passées</h2>
        <Trophy />
        <UserCardList />
      </main>
      {menuOpen && <Menu onClose={handleCloseMenu} />}
      <div className="button-container">
        <button
          onClick={handleLogout}
          type="button"
          className="logout-user-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default User;
