import React from "react";

import { CLOSE_MENU } from './types';

import styles from './Menu.module.css';

export function BackOption({ dispatch, action }) {
  return <div className={styles.backToMain} onClick={() => {dispatch(action({ type: CLOSE_MENU, payload: true}))}}>Menu</div>;
}
