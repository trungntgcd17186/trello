import Trello from "./Trello/Trello";
import React, { useState } from "react";
import "./App.css";
import { defaultSrcImg } from "../src/Constants/index";

function App() {
  const backgroundStorage = localStorage.getItem("myBackground");
  const [background, setBackground] = useState(
    backgroundStorage || defaultSrcImg
  );

  //Xử lý hiệu ứng di chuột trên background.
  const handleMouseMove = (e) => {
    e.target.style.backgroundPosition = `calc(-${
      e.nativeEvent.offsetX / 200
    }px) calc(-${e.nativeEvent.offsetY / 200}px)`;
  };
  return (
    <div
      className="App"
      style={{ backgroundImage: "url(" + background + ")" }}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Trello
        setBackground={setBackground}
        background={background}
        backgroundStorage={backgroundStorage}
      />
    </div>
  );
}

export default App;
