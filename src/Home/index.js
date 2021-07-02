import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trashIcon from "@iconify-icons/oi/trash";
import bookIcon from "@iconify-icons/oi/book";
import zoomIn from "@iconify-icons/oi/zoom-in";
import { Icon } from "@iconify/react";
import { listDecks, deleteDeck } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    setDecks([]);
    getDecks();
  }, []);

  const getDecks = async () => {
    try {
      const data = await listDecks();
      setDecks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (confirmation) {
      try {
        await deleteDeck(deckId);
        console.log("deleted");
        getDecks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deckList = decks.map((deck) => (
    <li className="card mb-3" key={deck.id}>
      <div className="card-body">
        {" "}
        <div className="justify-content-between d-flex">
          <h4 className="card-title mb-1">{deck.name}</h4>
          <p>cards: {deck.cards.length}</p>
        </div>
        <div className="card-text mb-1">{deck.description}</div>
        <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}`}>
          {<Icon icon={zoomIn} />} View
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
          {<Icon icon={bookIcon} />} Study
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={() => deleteHandler(deck.id)}
        >
          <Icon icon={trashIcon} />
        </button>
      </div>
    </li>
  ));
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary mb-3">
        Create Deck
      </Link>
      <ul className="list-group">{deckList}</ul>
    </div>
  );
}
export default Home;
