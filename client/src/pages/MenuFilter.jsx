import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import pexels1 from "../assets/images/pexels-photo-5773238.jpg";
import xIcon from "../assets/svg/x-symbol-svgrepo-com.svg";
import boussole from "../assets/svg/boussole.svg";
import loupeImage from "../assets/images/loupe.png"; // Import the loupe image
import "./MenuFilter.css";

function MenuFilter({ onShowMenu }) {
  const [iconVisible, setIconVisible] = useState(false);
  const [isLoupeExpanded, setIsLoupeExpanded] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIconVisible(true);
  }, []);

  const handleIconClick = () => {
    navigate("/"); // Navigate to HomePage
  };

  const handleMenuClick = () => {
    onShowMenu(); // Show MenuReception when "MENU" is clicked
  };

  const handleLoupeClick = () => {
    setIsLoupeExpanded(true);
    inputRef.current.focus(); // Focus on the input
  };

  const handleInputClick = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the parent
  };

  return (
    /* eslint-disable jsx-a11y/no-static-element-interactions */
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
      <div className="menu-filter__container">
        <img
          className="menu-logo__image"
          src={boussole}
          alt="Boussole du logo d'Escapade"
        />
        <h1 className="menu-reception__escape">ESCAPADE.</h1>
        <h2 className="menu-filter__title">CLIMAT</h2>
        <h2 className="menu-filter__subtitle">BIOME</h2>
        {/* eslint-disabled jsx-a11y/no-static-element-interactions */}
        <div className="menu-filter__buttons">
          <button type="button" className="menu-filter__button">
            FORÊT
          </button>
          <button type="button" className="menu-filter__button">
            PLAINE
          </button>
          <button type="button" className="menu-filter__button">
            MONTAGNE
          </button>
          <button type="button" className="menu-filter__button">
            OCÉAN
          </button>
          <button type="button" className="menu-filter__button">
            MER
          </button>
          <button type="button" className="menu-filter__button">
            FROID
          </button>
        </div>
        <div
          className={`loupe__image ${isLoupeExpanded ? "expanded" : ""}`}
          onClick={handleLoupeClick}
          onKeyDown={handleLoupeClick}
          style={{ display: isLoupeExpanded ? "none" : "block" }}
        >
          <img className="loupe" src={loupeImage} alt="Loupe" />
        </div>
        {isLoupeExpanded && (
          <input
            type="text"
            className="loupe__input"
            placeholder="Search..."
            ref={inputRef}
            onClick={handleInputClick}
          />
        )}
        <button
          type="button"
          className="menu-filter__description"
          onClick={handleMenuClick}
        >
          MENU
        </button>
      </div>
    </div>
  );
}

MenuFilter.propTypes = {
  onShowMenu: PropTypes.func.isRequired,
};

export default MenuFilter;
