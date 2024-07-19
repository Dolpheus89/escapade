import { useRef, useEffect, useContext, useState } from "react";
import "../styles/Trophy.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import firstLike from "../assets/images/Firstlike.jpeg";
import { UserContext } from "../contexts/UserContext";

function FirstLike() {
  const { favorites } = useContext(UserContext);
  const trophyPopup = useRef();
  const tl = useRef();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if favorites array contains any items
    if (favorites.length > 0 && !showPopup) {
      setShowPopup(true); // Set showPopup to true to display the popup
      // Adjust the position of the popup based on the user's scroll position
      const yPos =
        window.scrollY +
        window.innerHeight / 2 -
        trophyPopup.current.offsetHeight / 2;
      trophyPopup.current.style.top = `${yPos}px`;
    }
  }, [favorites, showPopup]);

  useGSAP(() => {
    tl.current = gsap
      .timeline()
      .to(".trophy-popup", {
        x: -400,
        duration: 5,
        delay: 0.5,
      })
      .to(".trophy-popup", {
        x: 300,
      });
  }, []);

  useEffect(() => {
    setShowPopup(false); // Reset state on unmount
  }, []);

  return (
    <div
      ref={trophyPopup}
      className={`trophy-popup ${showPopup ? "show" : ""}`}
    >
      {showPopup && (
        <div
          className="background-trophy"
          style={{
            backgroundImage: `url(${firstLike})`,
            backgroundSize: "cover",
          }}
        >
          <h2 style={{ color: "gold", alignSelf: "flex-end" }}>
            Your first "liked"!
          </h2>
        </div>
      )}
    </div>
  );
}

export default FirstLike;
