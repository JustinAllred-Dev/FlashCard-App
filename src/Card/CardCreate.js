import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify-icons/oi/home";
import { createCard, readDeck } from "../utils/api";
function CardCreate() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState("Loading...");
  const [newCard, setNewCard] = useState({ front: "", back: "" });

  useEffect(() => {
    setNewCard({ front: "", back: "" });
    setDeck("Loading...");
    async function getDeck() {
      const selectedDeck = await readDeck(deckId);
      setDeck(selectedDeck);
    }
    getDeck();
  }, []);
  const handleChange = ({ target }) => {
    setNewCard((thisCard) => ({ ...thisCard, [target.name]: target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newCard);
    setNewCard({ front: "", back: "" });
  };

  const onSubmit = (newCard) => {
    createCard(deckId, newCard);
  };

  const onFinished = () => {
    history.push(`/decks/${deckId}`);
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<Icon icon={homeIcon} />}Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="front">
              Front:{" "}
              <textarea
                id="front"
                className="form-control"
                name="front"
                type="text"
                placeholder="Front of card:"
                rows="3"
                value={newCard.front}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="back">
              Back:{" "}
              <textarea
                id="back"
                className="form-control"
                name="back"
                type="text"
                placeholder="Back of card:"
                rows="3"
                value={newCard.back}
                onChange={handleChange}
              />
            </label>
          </div>
          <Link className="btn btn-secondary mr-2" onClick={onFinished}>
            Done
          </Link>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
export default CardCreate;
