import React from "react";

import styles from "./Game.module.css";

export function Game({ children }) {
  return (
    <div id="gameContainer" className={styles.gameContainer}>
      {children}
    </div>
  );
}
