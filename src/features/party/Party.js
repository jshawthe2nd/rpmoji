import React from "react";
import { useSelector } from "react-redux";
import { selectChars, selectActiveItem } from "./partySlice";

import { Character } from '../character/Character';

import styles from "./Party.module.css";

/**
 * 
 * we'll need to get this component talking to redux and request
 * the inventory and the party pieces of state
 */
export function Party({ children }) {
  
  const party = useSelector(selectChars);

  const activeItem = useSelector(selectActiveItem);
  console.log(activeItem);
  const onCharacterSelect = () => {

  }

  return (
    <div id="partyContainer" className={`${styles.partyContainer} ${activeItem !== null ? styles.activeItem : ``}`}>
      {party.map((char, index) => {
        
        return (
          <Character 
            key={char.id} 
            char={char} 
            onCharacterSelect={onCharacterSelect} 
            itemToUse={activeItem}
          />
        )
      })}
      {children}
    </div>
  );
}
