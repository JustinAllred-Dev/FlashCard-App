import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../utils/api";
import CardForm from "./CardForm";

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
          <li className="breadcrumb-item">Edit Card {cardId}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        card={editedCard}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onFinished={onFinished}
        deckId={deckId}
      />
    </div>
  );
}
export default CardEdit;
