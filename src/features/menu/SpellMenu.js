import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';
import { setCastingSpell, selectCastingCharacter, deactivateSpell } from '../party/partySlice';



export function SpellMenu( { spells, spellCasterId } ) {

  const dispatch        = useDispatch();

  const char = useSelector( ( state ) => {

    return state.party.characters[ spellCasterId ];

  } ); 

  console.log(char);

  const [ spellToCast, setSpellToCast ] = useState( { } );

  const onSpellClick   = ( spell ) => {  

    // if( spell.cost > char.stats.mp.current ) {

    //   return false;

    // }

    dispatch( setCastingSpell( { spell, spellCasterId } ) );

    setSpellToCast( spell );

  };


  return (
    <div className={ styles.spellMenu }>
      { spells.map( ( spell, index ) => {

        if( spell.type === 'cure' ) {

          return (
            <div key={ index } 
            className={ `
            
              ${ styles.subMenuOption }
              ${ 
                spellToCast.label === spell.label 
                  ? styles.castThisSpell 
                  : ``
              }
              ${
                spell.cost > char.stats.mp.current
                  ? styles.disableSpell
                  : ``
              }
  
            ` } 
            onClick={ (e) => { onSpellClick( spell ) } }>
              <Icon symbol={ spell.symbol } label={ spell.label } />
              { spell.label }
            </div>
          )
          
        }

        return true;

      } ) }
    </div>
  );
}