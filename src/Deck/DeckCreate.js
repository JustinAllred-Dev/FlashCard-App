import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify-icons/oi/home";
import { createDeck } from "../utils/api";
function DeckCreate() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const handleChange = ({ target }) => {
    setNewDeck((thisDeck) => ({ ...thisDeck, [target.name]: target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newDeck);
  };

  async function onSubmit(newDeck) {
    const savedDeck = await createDeck(newDeck);
    history.push(`/decks/${savedDeck.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<Icon icon={homeIcon} />}Home</Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

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
                placeholder="Name your new deck."
                value={newDeck.name}
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
                value={newDeck.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <Link className="btn btn-secondary mr-2" to="/">
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
export default DeckCreate;
