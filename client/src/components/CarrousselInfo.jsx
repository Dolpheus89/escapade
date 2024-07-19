import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/CarrouselInfo.css";
import boussole from "../assets/svg/boussole.svg";
import { useXpBar } from "../contexts/XpBarContext";

function CarrousselInfo({ cityData }) {
  const { gainXp, loseXp } = useXpBar();
  const titles = ["Quêtes", "Insolite", "Gastronomie"];
  const [textIndex, setTextIndex] = useState(0);

  const [questStates, setQuestStates] = useState(() => {
    const savedStates = cityData.choses_insolites_a_faire.map(
      (_, index) =>
        localStorage.getItem(`quest-${cityData.id}-${index}`) === "true"
    );
    return savedStates.length
      ? savedStates
      : new Array(cityData.choses_insolites_a_faire.length).fill(false);
  });

  const handleCheckboxChange = (index) => {
    const newQuestStates = [...questStates];
    const newState = !newQuestStates[index];
    newQuestStates[index] = newState;
    localStorage.setItem(`quest-${cityData.id}-${index}`, newState);
    setQuestStates(newQuestStates);

    if (newState) {
      gainXp(25); // Gain 25 XP when a quest is completed
    } else {
      loseXp(25); // Lose 25 XP when a quest is unchecked
    }
  };

  const texts = [
    <ul className="city-list-quests" key={`quests-${cityData.id}`}>
      {cityData.choses_insolites_a_faire.map((item, index) => (
        <li
          className="city-main-info-section__list-item-info"
          key={cityData.id}
        >
          <input
            type="checkbox"
            checked={questStates[index]}
            onChange={() => handleCheckboxChange(index)}
          />
          {item}
        </li>
      ))}
    </ul>,
    <div key={`insolite-${cityData.id}`}>{cityData.fait_insolite}</div>,
    <div key={`gastronomie-${cityData.id}`}>{cityData.gastronomie}</div>,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [titles.length]);

  const handleCircleButtonClick = () => () =>
    setTextIndex((prevIndex) => (prevIndex + 1) % titles.length);

  return (
    <>
      <section className="city-main-info-section__section">
        <h2 className="city-main-info-section__title">{titles[textIndex]}</h2>
        <div>{texts[textIndex]}</div>
        {/* <section className="next-button">
        <CircleButton
          onClick={handleCircleButtonClick}
          selectedIndex={textIndex}
        />
      </section> */}
      </section>
      <button
        type="button"
        onClick={handleCircleButtonClick(textIndex)}
        className="button-18"
      >
        <img
          style={{ maxWidth: "30px", fill: "white" }}
          src={boussole}
          alt=""
        />{" "}
        Escapade {textIndex + 1} / 3
      </button>
    </>
  );
}

CarrousselInfo.propTypes = {
  cityData: PropTypes.string.isRequired,
};

export default CarrousselInfo;
