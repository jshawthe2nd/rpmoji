import React from "react";

import { Party } from './features/party/Party';
import { Menu } from "./features/menu/Menu";
import { Game } from "./features/game/Game";
import "./App.css";

function App() {

  return (
    <div className="App">
      <h1>RPmoJi</h1>
      
      <Game/>
    </div>
  );
}

export default App;
