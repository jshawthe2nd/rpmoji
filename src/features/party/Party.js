import React from "react";
import { useSelector } from "react-redux";
import { selectChars, selectActiveItem, selectCharacterIds } from "./partySlice";

import { Character } from '../character/Character';

import styles from "./Party.module.css";

/**
 * 
 * we'll need to get this component talking to redux and request
 * the inventory and the party pieces of state
 * 
 * update: we sorta kinda have redux going
 */
export function Party( { children } ) {
    
  const party = useSelector( selectCharacterIds );


  const activeItem = useSelector( selectActiveItem );  
  
  return (
    <div id="partyContainer" className={ `${styles.partyContainer} ${ activeItem ? `applyingItem` : `` } ` }>
      { party.map( ( characterId, index ) => {
        
        return (
          <Character 
            key={ characterId } 
            charId={ characterId } 
          />
        )
      } ) }
      {children}
    </div>
  );
}
