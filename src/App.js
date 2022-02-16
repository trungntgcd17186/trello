import Trello from "./Trello/Trello";
import "./App.css";

const handleMouseMove = (e) => {
  e.target.style.backgroundPosition = `calc(50% + -${
    e.nativeEvent.offsetX / 200
  }px) calc(50% + -${e.nativeEvent.offsetY / 200}px)`;
};

function App() {
  return (
    <div className="App" onMouseMove={(e) => handleMouseMove(e)}>
      <Trello />
    </div>
  );
}

export default App;
