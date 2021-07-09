import React from "react";
import { Link } from "react-router-dom";

function CardForm({ card, handleChange, handleSubmit, onFinished, deckId }) {
  return (
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
              rows="2"
              value={card.front}
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
              value={card.back}
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
  );
}

export default CardForm;
