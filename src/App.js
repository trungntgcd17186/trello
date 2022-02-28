import React, { useState } from "react";
import { DEFAULT_SRC_IMG } from "../src/Constants/index";
import "./App.css";
import Trello from "./Trello";
import { backgroundStorage } from "./utils";

function App() {
  const [background, setBackground] = useState(
    backgroundStorage || DEFAULT_SRC_IMG
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
      style={{ backgroundImage: `url(${background})` }}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Trello setBackground={setBackground} background={background} />
    </div>
  );
}

export default App;
