import PropTypes from "prop-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeartButton from "./HeartButton";
import "../styles/CityCard.css";

function CityCard({ city, onClick }) {
  useGSAP(() => {
    const handleMouseEnter = (enterEvent) => {
      const cityCard = enterEvent.target;
      const onMouseMove = (moveEvent) => {
        const mouseX = moveEvent.clientX;
        const mouseY = moveEvent.clientY;

        const rect = cityCard.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;

        gsap.to(cityCard, {
          x: dx * 0.1,
          y: dy * 0.1,
          rotationX: dy * 0.1,
          rotationY: -dx * 0.1,
          boxShadow: `${dx * 0.2}px ${dy * 0.2}px 30px rgba(0, 0, 0, 0.6)`,
          duration: 0.3,
          scale: 1.1,
          ease: "power2.out",
        });
      };

      cityCard.addEventListener("mousemove", onMouseMove);

      const handleMouseLeave = () => {
        gsap.to(cityCard, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          boxShadow: "rgba(0, 0, 0, 0.5) 0px 10px 20px",
          duration: 0.3,
          scale: 1,
          ease: "power2.out",
        });
        cityCard.removeEventListener("mousemove", onMouseMove);
      };

      cityCard.addEventListener("mouseleave", handleMouseLeave);
    };

    document.querySelectorAll(".city-card").forEach((card) => {
      card.addEventListener("mouseenter", handleMouseEnter);
    });
  });

  return (
    <div
      className="city-card"
      onClick={onClick}
      onKeyDown={onClick}
      type="button"
      aria-hidden="true"
    >
      <h3 className="city-card__title">{city.name}</h3>
      <img className="city-card__image" src={city.img[0]} alt={city.name} />
      <HeartButton city={city} />
    </div>
  );
}

CityCard.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string,
    region: PropTypes.string,
    id: PropTypes.number,
    biome: PropTypes.string,
    climat: PropTypes.string,
    fait_insolite: PropTypes.string, // Changement pour correspondre à l'exemple donné
    gastronomie: PropTypes.string,
    choses_insolites_a_faire: PropTypes.arrayOf(PropTypes.string),
    img: PropTypes.arrayOf(PropTypes.string),
  }),
  onClick: PropTypes.func,
};

CityCard.defaultProps = {
  city: {
    name: "",
    region: "",
    biome: "",
    climat: "",
    fait_insolite: "",
    gastronomie: "",
    choses_insolites_a_faire: [],
    img: [],
  },
  onClick: () => {},
};

export default CityCard;
