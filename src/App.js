import { useState, useEffect } from "react";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";
import Header from "./components/Header";

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null); // First card picked
  const [pickTwo, setPickTwo] = useState(null); // Second card picked
  const [disabled, setDisabled] = useState(false); // Delay handler
  const [wins, setWins] = useState(0); // Win streak

  const handleClick = (card) => {
    if (disabled) {
      // If the game is in a disabled state, ignore clicks
      return;
    }

    // Check if the card is the same as the first picked card
    if (card === pickOne) {
      // Do nothing if the same card is clicked again
      return;
    }

    // If no first card is picked or the second card is different, process normally
    pickOne ? setPickTwo(card) : setPickOne(card);
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Start over
  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    let pickTimer;

    // Two cards have ben clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            }
            // no match
            return card;
          });
        });
        handleTurn();
      } else {
        // Delay before flipping cards back
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(handleTurn, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  useEffect(() => {
    // check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin < 1) {
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div class="grid">
        {cards.map((card) => {
          const { id, image, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
