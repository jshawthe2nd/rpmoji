import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectChars, selectActiveItem, deactivateItem } from "./partySlice";

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
    
  const party = useSelector( selectChars );

  const dispatch = useDispatch();

  const activeItem = useSelector( selectActiveItem );  
  
  return (
    <div id="partyContainer" className={ `${styles.partyContainer} ${ activeItem ? `applyingItem` : `` } ` }>
      { party.map( ( char, index ) => {
        
        return (
          <Character 
            key={ char.id } 
            charId={ char.id } 
          />
        )
      } ) }
      {children}
    </div>
  );
}
