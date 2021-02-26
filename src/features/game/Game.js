import React from "react";

import styles from "./Game.module.css";

/**
 * we can use React.Context here so the Game knows 
 * when the menu button is pressed so the components
 * change accordingly 
 */

export function Game({ children }) {
  return (
    <div id="gameContainer" className={styles.gameContainer}>
      {children}
    </div>
  );
}
