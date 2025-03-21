import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { selectActiveItem, selectCharacterIds, selectGearToEquip } from "./partySlice";

import { Character } from '../character/Character';

import styles from "./Party.module.css";

/**
 * 
 * we'll need to get this component talking to redux and request
 * the inventory and the party pieces of state
 * 
 * update: we sorta kinda have redux going
 */
export function Party( props ) {

  const { paused, children } = props;
    
  const party = useSelector( selectCharacterIds );

  const activeItem = useSelector( selectActiveItem );  

  const gearToEquip = useSelector( selectGearToEquip );
  
  return (
      <div 
        id="partyContainer" 
        className={ 
          `${styles.partyContainer} ${ activeItem ? `applyingItem` : `` } 
          ${ gearToEquip ? `applyingItem` : ``}` 
        }>
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
