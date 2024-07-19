import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/CityFirstSection.css";
import HeartButton from "./HeartButton";

function CityFirstSection({ cityData, showPopup }) {
  const [weather, setWeather] = useState(cityData.name);
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef();

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-img-1"), {
        x: 200,
        opacity: 0,
        duration: 0.5,
        ease: "power2",
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-text-1"), {
        x: -200,
        opacity: 0,
        delay: 0.3,
        duration: 0.3,
        ease: "power2",
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-text-2"), {
        x: 200,
        opacity: 0,
        delay: 0.6,
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-text-3"), {
        y: 200,
        opacity: 0,
        delay: 0.65,
      });
    },
    [],
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.from(container.current.querySelectorAll(".gsap-icon-1"), {
        scale: 2,
        opacity: 0,
        delay: 2,
        duration: 1,
        ease: "elastic.out",
      });
    },
    [],
    { scope: container }
  );

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=0c353eabd4564185b10160058242504&q=${cityData}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        throw new Error(`Error in fetchWeather(): ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section className="city-main-first-section" ref={container}>
      <div className="city-main-first-section__text-container">
        <h1 className="city-main-first-section__title gsap-text-1">
          {cityData.name}
        </h1>
        <h2 className="city-main-first-section__subtitle  gsap-text-1">
          {cityData.region}
        </h2>
        <div className="city-main-first-section__weather-info  gsap-text-2">
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <span
              className="city-main-first-section__weather-info-container
            "
            >
              <span>{weather.current.temp_c}°C</span>
              <img src={weather.current.condition.icon} alt="meteo icon" />
            </span>
          )}
        </div>
        <p className="city-main-first-section__description  gsap-text-3">
          {cityData.description}
        </p>
        <div>
          <HeartButton
            city={cityData}
            className="city-heart-icon gsap-icon-1"
          />
        </div>
      </div>
      <img
        src={cityData.img[0]}
        alt={cityData.name}
        className="city-main-first-section__round-image gsap-img-1"
        onClick={showPopup}
        type="button"
        aria-hidden="true"
        onKeyDown={() => {}}
      />
      <img
        src={cityData.img[1]}
        alt={cityData.name}
        className="city-main-first-section__square-image gsap-img-1"
        onClick={showPopup}
        type="button"
        aria-hidden="true"
        onKeyDown={() => {}}
      />
    </section>
  );
}
CityFirstSection.propTypes = {
  cityData: PropTypes.string.isRequired,
  showPopup: PropTypes.func.isRequired,
};

export default CityFirstSection;
