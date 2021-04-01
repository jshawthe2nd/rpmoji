import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../icons/Icon";

import { openMenu } from "../menu/menuSlice";
import {
  recoverHP,
  recoverMP,
  clearStatus,
  decrementItemQty,
  selectActiveItem,
  deactivateItem,
} from "../party/partySlice";

import {
  getCharacterSymbolPath,
  getCharacterIconLabel,
  canItemBeUsed
} from "./utils";

import {
  checkCharacterStatus
} from './actions';

import styles from "./Character.module.css";

export function Character( { charId, ...props } ) {

  const dispatch = useDispatch();

  const char = useSelector( ( state ) => {

    return state.party.chars.find( ( c ) => c.id === charId );

  } ); 

  const itemToUse = useSelector( selectActiveItem );

  const doesItemApplyToChar = canItemBeUsed( char, itemToUse ); 

  //const isGearEquippable    = canGearBeEquipped( char, gearToUse );

  const onCharacterSelect = ( event ) => {
    //if( applyingItem ) {

      if ( itemToUse !== null ) {

        console.log(itemToUse);

        switch ( itemToUse.label ) {

          case `Potion`:

            dispatch( recoverHP( { charId: char.id } ) );
                        
            break;

          case `Ether`:

            dispatch( recoverMP( { charId: char.id } ) );                

            break;

          case `Antidote`:
          case `Elixir`:

            dispatch( clearStatus( { charId: char.id } ) );    

            break;

          default:
            return;

        }
        
        dispatch( decrementItemQty( { itemUsed: itemToUse } ) );

        dispatch( checkCharacterStatus( char.id, itemToUse.label, deactivateItem ) );

      }
    
    //}

  };
 
  
  return (
    <div
      className={ `${ styles.character } ${
        itemToUse && !doesItemApplyToChar
          ? styles.dimCharacter
          : ``
      } ${
        itemToUse && doesItemApplyToChar
          ? styles.applyingToChar
          : ``
      }`}

      onClick={ onCharacterSelect }
    >
      <div className={ styles.charIcon }>
        <Icon
          symbol={ getCharacterSymbolPath( char ) }
          label={ getCharacterIconLabel( char ) }
        />
        { char.status && (
          <Icon
            status={ char.status }
            symbol={ `status.${ char.status }` }
            label={ `${ char.status }` }
          />
        ) }
      </div>
      <div className={ styles.charDetails }>
        <h2>
          {char.name} L.<span>{ char.stats.level.current }</span>
        </h2>

        <div className={ styles.charStats }>
          <div className={ styles.mainCharStats }>
            <div className="hp-mp">
              <span>
                HP:{ char.stats.hp.current }/{ char.stats.hp.max }
              </span>
              {char.charType === 2 && (
                <span>
                  MP:{ char.stats.mp.current }/{ char.stats.mp.max }
                </span>
              )}
            </div>

            <div className="xp">
              <span>
                XP:{ char.stats.level.exp }/{ char.stats.level.next }
              </span>
            </div>
          </div>
          <div className={ styles.gear }>
            <div
              className={ styles.weapon }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch( openMenu( { menu: "weapons" } ) );
              } }
            >
              <Icon symbol="item.weapon.sword" label="sword" /> Wood
            </div>
            <div
              className={ styles.armor }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch( openMenu( { menu: "armor" } ) );
              } 
              } >
              <Icon symbol="item.armor" label="armor" /> Leather
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
