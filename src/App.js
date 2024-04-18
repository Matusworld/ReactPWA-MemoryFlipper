import { useState } from "react";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState(shuffle);

  return (
    <>
      <div class="grid">
        {cards.map((card) => {
          const { id, image, matched } = card;

          return (
            <Card key={id} image={image} selected={false} onClick={() => {}} />
          );
        })}
      </div>
    </>
  );
}

export default App;
