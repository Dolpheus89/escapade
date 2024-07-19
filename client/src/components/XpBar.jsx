import "../styles/Xpbar.css";
import { useXpBar } from "../contexts/XpBarContext";

function XpBar() {
  const { xpPercentage } = useXpBar();

  const fillerStyle = {
    height: "100%",
    width: `${xpPercentage}%`,
    backgroundColor: "#4286f4",
    borderRadius: "inherit",
    textAlign: "center",
    transition: "width 1s ease-in-out",
  };

  return (
    <div className="xp-bar-container">
      <div style={fillerStyle} className="percentage-barxp">
        {Math.round(xpPercentage)}%
      </div>
    </div>
  );
}

export default XpBar;
