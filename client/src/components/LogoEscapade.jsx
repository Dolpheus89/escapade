import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import "../styles/LogoEscapade.css";
import boussole from "../assets/svg/boussole.svg";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

function LogoEscapade() {
  const container = useRef();
  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: Infinity, repeatDelay: 1 });
      tl.to(".logo__image", {
        rotation: "15deg",
        ease: "power.in",
        duration: 1,
      });
      tl.to(".logo__image", {
        rotation: "-45deg",
        ease: "power.in",
        duration: 1.5,
      });
      tl.to(".logo__image", {
        rotation: "15deg",
        ease: "power.in",
        duration: 0.5,
        delay: 1,
      });
      tl.to(".logo__image", {
        rotation: "-190deg",
        ease: "power.in",
        duration: 1,
        delay: 1,
      });
      tl.to(".logo__image", {
        rotation: "0",
        ease: "power.in",
        duration: 1,
        delay: 1,
      });
    },
    [],
    { scope: container }
  );

  return (
    <div className="logo" ref={container} onClick={handleClick}>
      <img
        className="logo__image"
        src={boussole}
        alt="Boussole du logo d'Escapade"
      />
      <p className="logo__title">Escapade.</p>
    </div>
  );
}

export default LogoEscapade;
