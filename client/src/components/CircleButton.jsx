import { useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/CircleButton.css";

function CircleButton({ onClick, selectedIndex }) {
  const container = useRef();

  useGSAP(() => {
    gsap.to(".circle", { x: 150, duration: 1, scale: 2, repeat: 1, delay: 3 });
  });

  const handleClick = (index) => {
    onClick(index);
  };

  return (
    <div ref={container} className="container-circle">
      {[0, 1, 2].map((index) => (
        <button
          key={index}
          className={`circle ${selectedIndex !== index ? "unselected" : ""}`}
          onClick={() => handleClick(index)}
          type="button"
        >
          .
        </button>
      ))}
    </div>
  );
}
CircleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default CircleButton;
