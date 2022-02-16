import Trello from "./Trello/Trello";
import "./App.css";

const handleMouseMove = (e) => {
  e.target.style.backgroundPosition = `calc(-${
    e.nativeEvent.offsetX / 200
  }px) calc(-${e.nativeEvent.offsetY / 200}px)`;
};

function App() {
  return (
    <div className="App" onMouseMove={(e) => handleMouseMove(e)}>
      <Trello />
    </div>
  );
}

export default App;
