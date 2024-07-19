import PropTypes from "prop-types";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/CityInformationSection.css";
import CarrousselInfo from "./CarrousselInfo";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function CityInformationSection({ cityData, showPopup, hidePopup }) {
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-img-3"), {
        scrollTrigger: "#scroll-trigger",
        opacity: 0,
        duration: 0.5,
        y: 500,
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-img-4"), {
        scrollTrigger: "#scroll-trigger",
        y: 200,
        opacity: 0,
        delay: 0.7,
        duration: 0.5,
        ease: "power2",
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-img-5"), {
        scrollTrigger: "#scroll-trigger",
        x: 200,
        opacity: 0,
        delay: 1.2,
        duration: 0.5,
        ease: "power2",
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-text-2"), {
        scrollTrigger: "#scroll-trigger",
        y: 200,
        opacity: 0,
        delay: 1.5,
        duration: 0.5,
        ease: "power2",
      });
    },
    [],
    { scope: container }
  );

  return (
    <section
      className="city-main-info-section"
      ref={container}
      id="scroll-trigger"
    >
      <div className="city-main-info-section__left-container">
        <div className="city-main-info-section__image-container">
          <img
            src={cityData.img[2]}
            alt={cityData.name}
            className="city-main-info-section__large-rounded-image gsap-img-3"
            onClick={showPopup}
            type="button"
            aria-hidden="true"
          />
          <img
            src={cityData.img[3]}
            alt={cityData.name}
            className="city-main-info-section__medium-rounded-image gsap-img-4"
            onClick={showPopup}
            type="button"
            aria-hidden="true"
          />
        </div>
        <div className="city-main-info-section__info-container gsap-text-2">
          <CarrousselInfo cityData={cityData} hidePopup={hidePopup} />
        </div>
      </div>

      <img
        src={cityData.img[4]}
        alt={cityData.name}
        className="city-main-info-section__square-image gsap-img-5"
        onClick={showPopup}
        type="button"
        aria-hidden="true"
      />
    </section>
  );
}

CityInformationSection.propTypes = {
  cityData: PropTypes.string.isRequired,
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
};

export default CityInformationSection;
