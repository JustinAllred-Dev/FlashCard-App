import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify-icons/oi/home";
import trashIcon from "@iconify-icons/oi/trash";
import bookIcon from "@iconify-icons/oi/book";
import brushIcon from "@iconify-icons/oi/brush";
import plusIcon from "@iconify-icons/oi/plus";

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
            {<Icon icon={brushIcon} />} Edit
          </Link>
          <button
            className="btn btn-danger float-right"
            onClick={() => cardDeleteHandler(card.id)}
          >
            {<Icon icon={trashIcon} />}
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
            <Link to="/">{<Icon icon={homeIcon} />}Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
      <h1>{deck.name}</h1>
      <p>{deck.description}</p>
      <div>
        <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}/edit`}>
          {<Icon icon={brushIcon} />} Edit
        </Link>
        <Link className="btn btn-primary mr-2" to={`/decks/${deck.id}/study`}>
          {<Icon icon={bookIcon} />} Study
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
          {<Icon icon={plusIcon} />} Add Cards
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={() => deckDeleteHandler(deck.id)}
        >
          <Icon icon={trashIcon} />
        </button>
        <h1 className="mt-2">Cards</h1>
        <ul className="list-group">{cardList}</ul>
      </div>
    </div>
  );
}
export default DeckSelected;
