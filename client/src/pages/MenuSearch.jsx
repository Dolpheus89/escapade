import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pexels1 from "../assets/images/pexels-photo-5773238.jpg";
import xIcon from "../assets/svg/x-symbol-svgrepo-com.svg";
import boussole from "../assets/svg/boussole.svg";
import "./MenuSearch.css";

function MenuSearch() {
  const [iconVisible, setIconVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIconVisible(true);
  }, []);

  const handleIconClick = () => {
    navigate("/search"); // Change this to the desired route
  };

  return (
    <div className="menu">
      <img className="menu__image" src={pexels1} alt="fond" />
      {iconVisible && (
        <button
          type="button"
          className="menu-user__icon-button"
          onClick={handleIconClick}
        >
          <img
            className="menu-user__icon"
            src={xIcon}
            alt="Fermer et retour sur menu"
          />
        </button>
      )}
      <img
        className="menu-logo__image"
        src={boussole}
        alt="Boussole du logo d'Escapade"
      />
      <h1 className="menu-reception__escape">ESCAPADE.</h1>
      <button type="button" className="menu-reception__title">
        CLIMAT
      </button>
      <button type="button" className="menu-reception__subtitle">
        RECHERCHER
      </button>
      <button type="button" className="menu-reception__description">
        MENU
      </button>
    </div>
  );
}

export default MenuSearch;
