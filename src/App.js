import './App.css';
import Deck from './Deck';
import Card from './Card';
import defaultCardImage from "./defaultCard.png";

function App() {
  return (
    <div className="App">
      <Card image={defaultCardImage} />
      <Deck />
    </div>
  );
}

export default App;
