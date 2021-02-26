import React from "react";


import styles from './Menu.module.css';

export function BackOption({ onMenuClosed }) {
  return <div className={styles.backToMain} onClick={() => {
    onMenuClosed();
  }
  }>&laquo; Back</div>;
}
