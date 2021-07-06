import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";
function CardEdit() {
  const history = useHistory();
  const { cardId, deckId } = useParams();
  const [deck, setDeck] = useState("Loading...");
  const [editedCard, setEditedCard] = useState({ id: "", front: "", back: "" });

  useEffect(() => {
    setEditedCard({ id: "", front: "", back: "" });
    setDeck("Loading...");
    async function getCard() {
      const selectedCard = await readCard(cardId);
      setEditedCard(selectedCard);
    }
    async function getDeck() {
      const selectedDeck = await readDeck(deckId);
      setDeck(selectedDeck);
    }
    getCard();
    getDeck();
  }, []);
  const handleChange = ({ target }) => {
    setEditedCard((thisCard) => ({ ...thisCard, [target.name]: target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(editedCard);
    history.push(`/decks/${deckId}`);
  };

  const onSubmit = (editedCard) => {
    updateCard(editedCard);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="front">
              Name:{" "}
              <input
                id="front"
                className="form-control"
                name="front"
                type="text"
                placeholder="Front of card:"
                value={editedCard.front}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="back">
              Description:{" "}
              <textarea
                id="back"
                className="form-control"
                name="back"
                type="text"
                placeholder="Back of card:"
                rows="3"
                value={editedCard.back}
                onChange={handleChange}
              />
            </label>
          </div>
          <Link className="btn btn-secondary mr-2" to={`/decks/${deckId}`}>
            Cancel
          </Link>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
export default CardEdit;
