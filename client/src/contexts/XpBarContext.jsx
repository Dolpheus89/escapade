// contexts/XpBarContext.js
import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const XpBarContext = createContext();

const levelNames = [
  "Flâneur",
  "Promeneur",
  "Randonneur",
  "Explorateur",
  "Trotteur",
  "Aventurier",
  "Voyageur",
  "Globetrotteur",
  "Chercheur d'Escapade",
  "Conquérant",
];

export function XpBarProvider({ children }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [xpPercentage, setXpPercentage] = useState(0);
  const maxXp = 100; // Maximum XP value before the bar resets

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
    setXpPercentage((xp / maxXp) * 100);
    if (xp >= maxXp) {
      setLevel((prevLevel) => Math.min(prevLevel + 1, levelNames.length - 1));
      setXp(xp - maxXp);
    }
  }, [xp, level]);

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
  }, [xp, level]);

  const gainXp = (value) => {
    setXp((prevXp) => {
      const newXp = prevXp + value;
      if (newXp >= maxXp) {
        setLevel((prevLevel) => Math.min(prevLevel + 1, levelNames.length - 1)); // Increment level
        return newXp - maxXp; // Reset XP to the overflow amount
      }
      return newXp;
    });
  };

  const loseXp = (value) => {
    setXp((prevXp) => Math.max(prevXp - value, 0));
  };

  return (
    <XpBarContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        xp,
        maxXp,
        gainXp,
        loseXp,
        level,
        levelName: levelNames[level],
        xpPercentage,
      }}
    >
      {children}
    </XpBarContext.Provider>
  );
}

export const useXpBar = () => useContext(XpBarContext);

XpBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
