import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function DeckSelected() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    name: "Loading...",
    description: "",
    cards: [],
  });
  useEffect(() => {
    loadDeck();
  }, [deckId]);

  const loadDeck = async () => {
    const loadedDeck = await readDeck(deckId);
    setDeck(loadedDeck);
  };

  const deckDeleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmation) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const cardDeleteHandler = async (cardId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmation) {
      await deleteCard(cardId);
      loadDeck();
    }
  };

  const cardList = deck.cards.map((card, index) => (
    <li className="card mb-1" key={index}>
      <div className="card-body">
        {" "}
        <div className="justify-content-between d-flex mb-2">
          <div className="col">{card.front}</div>
          <div className="col">{card.back}</div>
        </div>
        <div className="float-right">
          <Link
            className="btn btn-secondary mr-2"
            to={`/decks/${deck.id}/${card.id}/edit`}
          >
            <span className="oi oi-pencil" /> Edit
          </Link>
          <button
            className="btn btn-danger float-right"
            onClick={() => cardDeleteHandler(card.id)}
          >
            <span className="oi oi-trash" />
          </button>
        </div>
      </div>
    </li>
  ));
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <div>
        <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}/edit`}>
          <span className="oi oi-pencil" /> Edit
        </Link>
        <Link className="btn btn-primary mr-2" to={`/decks/${deck.id}/study`}>
          <span className="oi oi-book" /> Study
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
          <span className="oi oi-plus" /> Add Cards
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={() => deckDeleteHandler(deck.id)}
        >
          <span className="oi oi-trash" />
        </button>
        <h1 className="mt-2">Cards</h1>
        <ul className="list-group">{cardList}</ul>
      </div>
    </div>
  );
}
export default DeckSelected;
