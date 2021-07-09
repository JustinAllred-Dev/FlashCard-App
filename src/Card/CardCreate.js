import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

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
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
          <li className="breadcrumb-item">Add Card</li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>

      <CardForm
        card={newCard}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onFinished={onFinished}
        deckId={deckId}
      />
    </div>
  );
}
export default CardCreate;
