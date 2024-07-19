/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/Menu.css";
import closeIcon from "../assets/svg/x-symbol-svgrepo-com.svg";
import boussole from "../assets/svg/boussole.svg";
import { SearchContext } from "../contexts/SearchContext";

export default function Menu({ onClose }) {
  const [biomeActive, setBiomeActive] = useState(false);
  const [climatActive, setClimatActive] = useState(false);
  const [filterOn, setFilterOn] = useState(false);

  const { setSearchType, setSearchQuery } = useContext(SearchContext);
  const container = useRef();
  const containerTwo = useRef();
  const navigate = useNavigate();

  const handleClickFilter = () => {
    setFilterOn(!filterOn);
  };

  const handleBiomeSearch = () => {
    setBiomeActive(!biomeActive);
    setSearchType("biome");
  };

  const handleClimatSearch = () => {
    setClimatActive(!climatActive);
    setSearchType("climat");
  };

  const handleQuery = (name) => () => {
    setSearchQuery(name);
    navigate("/search");
  };

  const biomes = ["plaine", "montagne", "mer"];
  const climats = [
    "tempere oceanique",
    "mediterraneen",
    "semi-continental",
    "montagnard",
  ];

  useGSAP(
    () => {
      gsap.from(container.current.querySelector(".gsap-menu-content"), {
        y: -1000,
        duration: 0.5,
        ease: "power1.inOut",
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelector(".gsap-menu-img"), {
        y: -1000,
        delay: 0.3,
        duration: 0.5,
        ease: "power1.inOut",
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(container.current.querySelector(".boussole"), {
        rotation: "-360deg",
        duration: 1.5,
        ease: "power1.out",
      });
      tl.to(".boussole", {
        rotation: "10deg",
        duration: 1,
        ease: "power1.in",
      });
      tl.to(".boussole", {
        rotation: "-10deg",
        delay: 0.5,
        duration: 1,
        ease: "power1.inOut",
      });
      tl.to(".boussole", {
        rotation: "0deg",
        delay: 0.5,
        duration: 1,
        ease: "power1.inOut",
      });
    },
    [],
    { scope: containerTwo }
  );

  return (
    <nav className="menu hidden" ref={container}>
      <div className="menu__image gsap-menu-img">
        <button type="button" onClick={onClose} onKeyDown={() => {}}>
          <img src={closeIcon} alt="fermer le menu" />
        </button>
      </div>
      <div className="menu__content gsap-menu-content">
        <div>
          <div className="logo-escapade-big" ref={containerTwo}>
            <img src={boussole} alt="boussole" className="boussole" />
            <div>Escapade.</div>
          </div>
        </div>
        <section className="menu__general">
          <div className="menu__menu-container">
            {filterOn ? (
              <button
                className="header-button"
                type="button"
                onKeyDown={() => {}}
                onClick={handleClickFilter}
              >
                <h1>Menu</h1>
              </button>
            ) : (
              <button
                className="header-button"
                type="button"
                onKeyDown={() => {}}
                onClick={() => navigate("/")}
              >
                <h1>Accueil</h1>
              </button>
            )}
          </div>

          {filterOn ? (
            <>
              <div onKeyDown={() => {}} onClick={handleBiomeSearch}>
                <h2>Biome</h2>
                <ul>
                  {biomeActive &&
                    biomes.map((item) => (
                      <li key={item}>
                        <button type="button" onClick={handleQuery(item)}>
                          {item.toUpperCase()}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              <div onKeyDown={() => {}} onClick={handleClimatSearch}>
                <h2>Climat</h2>
                <ul>
                  {climatActive &&
                    climats.map((item) => (
                      <li key={item}>
                        <button type="button" onClick={handleQuery(item)}>
                          {item.toUpperCase()}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="menu__accueil">
              <button
                className="header-button"
                type="button"
                onClick={handleClickFilter}
                onKeyDown={() => {}}
              >
                <h2>Rechercher</h2>
              </button>
              <button
                className="header-button"
                type="button"
                onClick={() => navigate("/user")}
                onKeyDown={() => navigate("/user")}
              >
                <h2>Mes escapades</h2>
              </button>
            </div>
          )}
        </section>
      </div>
    </nav>
  );
}

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
};
