import { useRef, useEffect } from "react";
import "../styles/Trophy.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import adventure from "../assets/images/Adventure.jpeg";

function Trophy() {
  const trophyPopup = useRef();
  const tl = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      document.querySelector(".trophy-popup").classList.add("show");
    }
  }, []);

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

  // const resetLocalStorage = () => {
  //   localStorage.removeItem("isFirstVisit");
  //   window.location.reload(); // Reload the page to recheck the first visit logic
  // };

  return (
    <div ref={trophyPopup}>
      <div className="trophy-popup">
        <div
          className="background-trophy"
          style={{
            backgroundImage: `url(${adventure})`,
            backgroundSize: "cover",
          }}
        >
          <h2>Bienvenue dans votre espace !</h2>
        </div>
      </div>
      {/* <button
        type="button"
        onClick={resetLocalStorage}
        style={{ marginTop: "20px" }}
      >
        Reset Local Storage
      </button> */}
    </div>
  );
}

export default Trophy;
