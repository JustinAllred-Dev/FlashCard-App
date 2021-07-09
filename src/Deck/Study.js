import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [cardFilp, setCardFlip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(0);

  useEffect(() => {
    setDeck({ name: "Loading...", cards: [] });
    async function getDeck() {
      try {
        const thisDeck = await readDeck(deckId);
        setDeck(thisDeck);
      } catch (error) {
        console.log(error);
      }
    }
    getDeck();
  }, [deckId]);

  const handleCardFlip = () => {
    setCardFlip(!cardFilp);
  };

  const handleCardChange = () => {
    if (selectedCard + 1 !== deck.cards.length) {
      handleCardFlip();
      setSelectedCard(selectedCard + 1);
    } else {
      const confirmation = window.confirm(
        "Restart Cards? Click 'Cancel' to return to the home page."
      );
      if (confirmation) {
        handleCardFlip();
        setSelectedCard(0);
      } else {
        history.push("/");
      }
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              {" "}
              <span className="oi oi-home" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item">Study</li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {deck.cards.length <= 2 ? (
        <div className="card mt-2">
          <div className="card-body">
            <h4 className="card-title mb-1">Not enough cards.</h4>
            <div className="card-text mb-1">
              You need at least 3 cards to study.
            </div>
            <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
              Add Cards
            </Link>
          </div>
        </div>
      ) : cardFilp === false ? (
        <div className="card mt-2" key={selectedCard}>
          <div className="card-body">
            <h4 className="card-title mb-1">
              Card {selectedCard + 1} of {deck.cards.length}
            </h4>
            <div className="card-text mb-3">
              {deck.cards[selectedCard].front}
            </div>
            <button className="btn btn-secondary mr-2" onClick={handleCardFlip}>
              Flip
            </button>
          </div>
        </div>
      ) : (
        <div className="card mt-2" key={selectedCard}>
          <div className="card-body">
            <h4 className="card-title mb-1">
              {selectedCard + 1} of {deck.cards.length}
            </h4>
            <div className="card-text mb-3">
              {deck.cards[selectedCard].back}
            </div>
            <button className="btn btn-secondary mr-2" onClick={handleCardFlip}>
              Flip
            </button>
            <button className="btn btn-primary" onClick={handleCardChange}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Study;
