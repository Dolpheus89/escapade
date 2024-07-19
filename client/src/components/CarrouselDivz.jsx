import { Divz, DivzVideoItem } from "divz";
import "../styles/CarrouselDivz.css";
import { useState } from "react";
import PropTypes from "prop-types";
import arrow from "../assets/images/fleche-gauche.png";

function CarrousselDivz({ hidePopup, cityData }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const paris = [
    { image: cityData.img[0] },
    { image: cityData.img[4] },
    { image: cityData.img[2] },
  ];

  return (
    <>
      <img
        className="arrow-back-city"
        src={arrow}
        alt="Go back city"
        onClick={hidePopup}
        type="button"
        aria-hidden="true"
      />
      <video autoPlay playsInline loop muted className="background">
        <source src={cityData.video} type="video/mp4" />
      </video>
      <Divz
        autoPlay
        autoPlayDuration={7000}
        isDarkMode
        onIndexChange={(i) => setSelectedIndex(i)}
      >
        {paris.map((item) => (
          <DivzVideoItem
            key={item.id}
            index={item.id}
            selectedIndex={selectedIndex}
            previewImage={item.image}
          />
        ))}
      </Divz>
    </>
  );
}

CarrousselDivz.propTypes = {
  hidePopup: PropTypes.func.isRequired,
  cityData: PropTypes.shape({
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    video: PropTypes.string.isRequired,
  }).isRequired,
};
export default CarrousselDivz;
