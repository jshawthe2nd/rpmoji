import React from "react";
import { Party } from './features/party/Party';
import { Menu } from "./features/menu/Menu";
import { Game } from "./features/game/Game";
import "./App.css";

function App() {

  return (
    <div className="App">
      <h1>RPmoJi</h1>
      <p>RPmoJi (RPG, but made with emojis) is a pet project of mine to keep myself updated with React and thinking about coding while hunting for a job. Coincidentally, it's also meant to be a project to entice potential employers!</p>
      <Game>
          <Party/>
          <Menu />
        </Game>
    </div>
  );
}

export default App;
