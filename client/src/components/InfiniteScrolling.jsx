import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InfiniteScrolling.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PropTypes from "prop-types";
import CityCard from "./CityCard";
import { sliceArray, shuffleArray } from "../functions/arrayFunctions";
import { useXpBar } from "../contexts/XpBarContext";

function InfiniteScrolling({ cities }) {
  const shuffledArray = shuffleArray(cities);
  const firstDivArray = sliceArray(shuffledArray, 0, 7);
  const secondDivArray = sliceArray(shuffledArray, 7, 14);
  const thirdDivArray = sliceArray(shuffledArray, 14, 21);

  const navigate = useNavigate();
  const { gainXp } = useXpBar();
  const [clickedCities, setClickedCities] = useState([]);

  useEffect(() => {
    const savedClickedCities =
      JSON.parse(localStorage.getItem("clickedCities")) || [];
    setClickedCities(savedClickedCities);
  }, []);

  useEffect(() => {
    localStorage.setItem("clickedCities", JSON.stringify(clickedCities));
  }, [clickedCities]);

  const handleClick = (cityID) => () => {
    if (!clickedCities.includes(cityID)) {
      gainXp(15);
      setClickedCities([...clickedCities, cityID]);
    }
    navigate(`/city/${cityID}`);
  };

  const homeContainer = useRef();

  useGSAP(
    () => {
      gsap.to(
        homeContainer.current.querySelectorAll(".home-page__city-card-left"),
        {
          scrollTrigger: "#scroll-trigger",
          duration: 23,
          y: 100,
          repeat: -1,
          yoyo: true,
        }
      );
    },
    [],
    { scope: homeContainer }
  );

  useGSAP(
    () => {
      gsap.from(
        homeContainer.current.querySelectorAll(".home-page__city-card-middle"),
        {
          scrollTrigger: "#scroll-trigger",
          duration: 100,
          y: 200,
          repeat: -1,
          yoyo: true,
        }
      );
    },
    [],
    { scope: homeContainer }
  );

  useGSAP(
    () => {
      gsap.to(
        homeContainer.current.querySelectorAll(".home-page__city-card-right"),
        {
          scrollTrigger: "#scroll-trigger",
          duration: 15,
          y: 200,
          repeat: -1,
          yoyo: true,
        }
      );
    },
    [],
    { scope: homeContainer }
  );

  return (
    <div className="home-page__city-card-container" ref={homeContainer}>
      <div className="home-page__city-card-left">
        {firstDivArray.map((city) => (
          <CityCard key={city.id} city={city} onClick={handleClick(city.id)} />
        ))}
      </div>
      <div className="home-page__city-card-middle">
        {secondDivArray.map((city) => (
          <CityCard key={city.id} city={city} onClick={handleClick(city.id)} />
        ))}
      </div>

      <div className="home-page__city-card-right">
        {thirdDivArray.map((city) => (
          <CityCard key={city.id} city={city} onClick={handleClick(city.id)} />
        ))}
      </div>
    </div>
  );
}

InfiniteScrolling.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      region: PropTypes.string,
      id: PropTypes.number.isRequired,
      biome: PropTypes.string,
      climat: PropTypes.string,
      fait_insolite: PropTypes.string,
      gastronomie: PropTypes.string,
      choses_insolites_a_faire: PropTypes.arrayOf(PropTypes.string),
      img: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

InfiniteScrolling.defaultProps = {
  cities: [
    {
      name: "",
      region: "",
      biome: "",
      climat: "",
      fait_insolite: "",
      gastronomie: "",
      choses_insolites_a_faire: [],
      img: [],
    },
  ],
};

export default InfiniteScrolling;
