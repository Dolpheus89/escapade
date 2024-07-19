import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "./HomePage.css";
import branch from "../assets/images/branch.png";
import tree from "../assets/images/tree.png";
import burgerMenu from "../assets/images/burger-menu.png";
import video from "../assets/videos/9535416-uhd_3840_2160_30fps.mp4";
import MenuFilter from "../pages/MenuFilter";
import Menu from "./Menu";

function HomePage() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const videoRef = useRef(null);

  const containerAnimation = useRef();

  useGSAP(
    () => {
      gsap.from(
        containerAnimation.current.querySelectorAll(".home-page__branch"),
        {
          scrollTrigger: "#scroll-trigger",
          duration: 5,
          y: 10,
          x: 20,
          repeat: -1,
          yoyo: true,
        }
      );
    },
    [],
    { scope: containerAnimation }
  );

  useGSAP(
    () => {
      gsap.to(containerAnimation.current.querySelectorAll(".home-page__tree"), {
        scrollTrigger: "#scroll-trigger",
        duration: 4,
        y: 20,
        x: 10,
        repeat: -1,
        yoyo: true,
      });
    },
    [],
    { scope: containerAnimation }
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          "https://city-info-server.netlify.app/user",
          {
            headers: { Authorization: token },
          }
        );
        setUserName(response.data.name); // Récupère le nom de l'utilisateur
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuClick = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const handleShowMenu = () => {
    setIsFilterVisible(false);
    setIsMenuVisible(true);
  };

  return (
    <div className="home-page">
      {!isMenuVisible && (
        <>
          <video
            ref={videoRef}
            src={video}
            className="home-page__video"
            autoPlay
            muted
            loop
          />
          <div className="home-page__content">
            <div className="home-page__text-container">
              <h2 className="home-page__title">BIENVENUE {userName}</h2>
              <h1 className="home-page__subtitle">ESCAPADE</h1>
              <p className="home-page__description">
                L&apos;évasion commence ici
              </p>
            </div>
            {!userName && (
              <div className="home-page__buttons-container">
                <button type="button" className="home-page__button-register">
                  S&apos;ENREGISTRER
                </button>
                <Link to="/login" className="home-page__button-login">
                  Se connecter
                </Link>
              </div>
            )}
          </div>
          <div className="containerAnimation" ref={containerAnimation}>
            <img src={branch} alt="branche" className="home-page__branch" />
            <img src={tree} alt="arbre" className="home-page__tree" />
          </div>
          <button
            type="button"
            className="home-page__burger-button"
            onClick={handleMenuClick}
          >
            <img
              src={burgerMenu}
              alt="Menu"
              className="home-page__burger-icon"
            />
          </button>
        </>
      )}
      {isMenuVisible && <Menu onClose={handleCloseMenu} />}
      {isFilterVisible && <MenuFilter onShowMenu={handleShowMenu} />}
    </div>
  );
}

export default HomePage;
