import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/ScrollHorizontalCityCard.css";
import CityCard from "./CityCard";
import { sliceArray, shuffleArray } from "../functions/arrayFunctions";
import MapComponent from "./MapComponent";
import { useXpBar } from "../contexts/XpBarContext";

gsap.registerPlugin(ScrollTrigger);

function ScrollHorizontalCityCard({ cities, location }) {
  const shuffledArray = shuffleArray(cities);
  const firstDivArray = sliceArray(shuffledArray, 0, 4);
  const secondDivArray = sliceArray(shuffledArray, 0, 12);
  const thirdDivArray = sliceArray(shuffledArray, 10, 22);

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
    window.scrollTo({ top: 0, behavior: "smooth" }); // Ajout du défilement vers le haut
    navigate(`/city/${cityID}`);
  };

  useGSAP(() => {
    const contents = gsap.utils.toArray("#scrollhorizontal .content");

    gsap.to(contents, {
      xPercent: -100 * (contents.length - 1),
      scrollTrigger: {
        trigger: "#scrollhorizontal",
        pin: true,
        scrub: 1,
      },
    });
  });

  if (!location) return null;

  return (
    <div>
      <div id="scrollhorizontal">
        <div className="content">
          <div className="map">
            <MapComponent location={location} />
          </div>
          <div className="composantbis">
            {firstDivArray.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                onClick={handleClick(city.id)}
              />
            ))}
          </div>
        </div>
        <div className="content">
          <div className="composant">
            {secondDivArray.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                onClick={handleClick(city.id)}
              />
            ))}
          </div>
        </div>
        <div className="content">
          <div className="composant">
            {thirdDivArray.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                onClick={handleClick(city.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ScrollHorizontalCityCard.propTypes = {
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
  location: PropTypes.string.isRequired,
};

ScrollHorizontalCityCard.defaultProps = {
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

export default ScrollHorizontalCityCard;
