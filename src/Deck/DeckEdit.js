import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
function DeckEdit() {
  const history = useHistory();
  const { deckId } = useParams();
  const [editDeck, setEditDeck] = useState({ name: "", description: "" });

  useEffect(() => {
    setEditDeck({ name: "", description: "" });
    loadDeck();
  }, []);
  const loadDeck = async () => {
    const loadedDeck = await readDeck(deckId);
    setEditDeck(loadedDeck);
  };

  const handleChange = ({ target }) => {
    setEditDeck((thisDeck) => ({ ...thisDeck, [target.name]: target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(editDeck);
  };

  async function onSubmit(editDeck) {
    const savedDeck = await updateDeck(editDeck);
    history.push(`/decks/${savedDeck.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
      <h1>{editDeck.name}</h1>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">
              Name:{" "}
              <input
                id="name"
                className="form-control"
                name="name"
                type="text"
                placeholder="Name your deck."
                value={editDeck.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description:{" "}
              <textarea
                id="description"
                className="form-control"
                name="description"
                type="text"
                placeholder="Enter a description for the deck."
                rows="3"
                value={editDeck.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <Link className="btn btn-secondary mr-2" to={`/decks/${editDeck.id}`}>
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
export default DeckEdit;
