import { useState } from "react";
import "../styles/CityHeader.css";
import LogoEscapade from "./LogoEscapade";
import burgerIcon from "../assets/svg/burger-menu.svg";
import Menu from "./Menu";

function CityHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => setMenuOpen(!menuOpen);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <div>
      <header className="city-header">
        <button type="button" onClick={handleMenuClick} onKeyDown={() => {}}>
          <img
            src={burgerIcon}
            alt="open the menu"
            className="city-header__icon"
          />
        </button>
        <LogoEscapade />
      </header>
      {menuOpen && <Menu onClose={handleCloseMenu} />}
    </div>
  );
}

export default CityHeader;
