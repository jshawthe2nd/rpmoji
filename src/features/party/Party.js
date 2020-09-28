import React from "react";
import { useSelector } from "react-redux";
import { selectChars, selectActiveItem, selectApplyingItem } from "./partySlice";

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
  const applyingItem = useSelector(selectApplyingItem);  
  console.log(applyingItem);
  return (
    <div id="partyContainer" className={`${styles.partyContainer} ${applyingItem ? `applyingItem` : ``}`}>
      {party.map((char, index) => {
        
        return (
          <Character 
            key={char.id} 
            charId={char.id} 
            itemToUse={activeItem}
          />
        )
      })}
      {children}
    </div>
  );
}
