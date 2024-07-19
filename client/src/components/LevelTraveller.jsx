import { Outlet } from "react-router-dom";
import XpBar from "./XpBar";
import "../styles/LevelTraveller.css";
import { useXpBar } from "../contexts/XpBarContext";

function LevelTraveller() {
  const { xpPercentage, level, levelName } = useXpBar();
  const testData = [{ id: 1, bgcolor: "#6a1b9a", completed: xpPercentage }];

  return (
    <div>
      <div className="xp-header-container">
        <h2>
          {" "}
          {level + 1} - {levelName}
        </h2>
        {testData.map((item) => (
          <XpBar
            key={item.id}
            bgcolor={item.bgcolor}
            completed={item.completed}
          />
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default LevelTraveller;
