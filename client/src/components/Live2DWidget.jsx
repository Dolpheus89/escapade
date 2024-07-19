import { useEffect } from "react";
import "../styles/Live2DWidget.css";

function Live2DWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/live2d-widget@latest/lib/L2Dwidget.min.js";
    script.async = true;
    script.onload = () => {
      if (window.L2Dwidget) {
        const models = [
          "wanko", // 碗中小狗
          "shizuku", // 课桌女孩
          "hijiki", // 黑猫
          "haruto", // 海军男孩
        ];
        const index = Math.floor(Math.random() * models.length);
        const modelName = models[index];

        window.L2Dwidget.init({
          model: {
            jsonPath: `https://unpkg.com/live2d-widget-model-${modelName}@1.0.5/assets/${modelName}.model.json`,
            scale: 1,
          },
          display: {
            width: 170,
            height: 340,
          },
          mobile: {
            show: true,
            scale: 0.5,
          },
          react: {
            opacityDefault: 0.7,
            opacityOnHover: 0.2,
          },
        });

        setTimeout(() => {
          const live2dWidget = document.querySelector(".live2d-widget");
          if (live2dWidget) {
            live2dWidget.id = "live2d-widget";
          }
        }, 1000);
      } else {
        console.error("L2Dwidget is not defined");
      }
    };

    script.onerror = () => {
      console.error("Failed to load L2Dwidget.min.js");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default Live2DWidget;
