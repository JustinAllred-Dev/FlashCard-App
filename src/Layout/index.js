import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import DeckCreate from "../Deck/DeckCreate";
import DeckEdit from "../Deck/DeckEdit";
import DeckSelected from "../Deck/DeckSelected";
import Study from "../Deck/Study";
import CardCreate from "../Card/CardCreate";
import CardEdit from "../Card/CardEdit";
import { Route, Switch } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId" exact={true}>
            <DeckSelected />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
