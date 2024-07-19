import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import pexels1 from "../assets/images/pexels-photo-5773238.jpg";
import xIcon from "../assets/svg/x-symbol-svgrepo-com.svg";
import boussole from "../assets/svg/boussole.svg";
import "./MenuReception.css";

function MenuReception({ onClose, onShowFilter }) {
  const [iconVisible, setIconVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIconVisible(true);
  }, []);

  const handleIconClick = () => {
    onClose();
  };

  const handleRechercherClick = () => {
    onShowFilter();
  };

  const handleMesEscapadesClick = () => {
    navigate("/user");
  };

  const handleAccueilClick = () => {
    navigate("/");
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
      <div className="menu-reception__container">
        <img
          className="menu-logo__image"
          src={boussole}
          alt="Boussole du logo d'Escapade"
        />
        <h1 className="menu-reception__escape">ESCAPADE.</h1>
        <button
          type="button"
          className="menu-reception__title"
          onClick={handleMesEscapadesClick}
        >
          MES ESCAPADES
        </button>
        <button
          type="button"
          className="menu-reception__subtitle"
          onClick={handleRechercherClick}
        >
          RECHERCHER
        </button>
        <button
          type="button"
          className="menu-reception__description"
          onClick={handleAccueilClick}
        >
          ACCUEIL
        </button>
      </div>
    </div>
  );
}

MenuReception.propTypes = {
  onClose: PropTypes.func.isRequired,
  onShowFilter: PropTypes.func.isRequired,
};

export default MenuReception;
