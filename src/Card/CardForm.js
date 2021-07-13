import React from "react";
import { Link } from "react-router-dom";

function CardForm({ card, handleChange, handleSubmit, deckId }) {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-group">
          <label htmlFor="front">Front: </label>
          <textarea
            id="front"
            name="front"
            tabIndex="1"
            className="form-control"
            required={true}
            placeholder="Front side of card"
            value={card.front}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back: </label>
          <textarea
            id="back"
            name="back"
            tabIndex="2"
            className="form-control"
            required={true}
            placeholder="Back side of card"
            value={card.back}
            onChange={handleChange}
          />
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
