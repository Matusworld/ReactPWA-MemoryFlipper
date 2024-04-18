import { useEffect } from "react";

const Header = ({ handleNewGame, wins }) => {
  useEffect(() => {
    document.title = `${wins} wins`; // Correctly setting the document title
  }, [wins]); // Dependency array ensures this runs only when `wins` changes

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h3>Memory Game</h3>
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
};

export default Header;
