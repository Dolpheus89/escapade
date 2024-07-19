import { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext";
import "../styles/HeartButton.css";

function HeartButton({ city }) {
  const { addFavorite, removeFavorite, isFavorite } = useContext(UserContext);
  const [favorite, setFavorite] = useState(false);
  const container = useRef();

  useEffect(() => {
    setFavorite(isFavorite(city));
  }, [isFavorite, city]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
    setFavorite(!favorite);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleFavorite();
    }
  };

  return (
    <svg
      ref={container}
      xmlns="http://www.w3.org/2000/svg"
      className={`heart-icon ${favorite ? "favorite" : ""}`}
      viewBox="0 0 512 512"
      onClick={toggleFavorite}
      onKeyUp={handleKeyUp}
      type="button"
      aria-hidden="true"
    >
      <title>heart</title>
      {favorite ? (
        <path
          d="M256 448a16 16 0 0 1-9-2.61c-96.26-65.34-184.09-143.09-183-252.42.54-52.67 42.32-96.81 95.08-96.81C224 96 256 160 256 160s32-64 96.92-64c52.76 0 94.54 44.14 95.08 96.81 1.1 109.33-86.74 187.08-183 252.42a16 16 0 0 1-9 2.61z"
          fill="red"
        />
      ) : (
        <path
          d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0 0 18 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      )}
    </svg>
  );
}

HeartButton.propTypes = {
  city: PropTypes.string.isRequired,
};

export default HeartButton;
