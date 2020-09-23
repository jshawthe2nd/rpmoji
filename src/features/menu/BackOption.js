import React from "react";


import styles from './Menu.module.css';

export function BackOption({ dispatch, action }) {
  return <div className={styles.backToMain} onClick={() => {dispatch(action({ payload: true}))}}>Menu</div>;
}
