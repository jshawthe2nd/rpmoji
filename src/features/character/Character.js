import React, { useState } from "react";
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
  selectGearToEquip,
  equip,
  clearGearToEquip
} from "../party/partySlice";

import {
  getCharacterSymbolPath,
  getCharacterIconLabel,
  canItemBeUsed,
  canGearBeEquipped
} from "./utils";

import {
  checkCharacter
} from './actions';


import styles from "./Character.module.css";
import { checkItem } from "../party/actions";

export function Character( { charId, ...props } ) {

  const dispatch = useDispatch();

  const char = useSelector( ( state ) => {

    return state.party.characters[ charId ];

  } ); 

  const itemToUse             = useSelector( selectActiveItem );

  const doesItemApplyToChar   = canItemBeUsed( char, itemToUse ); 

  const gearToEquip           = useSelector( selectGearToEquip );

  const isGearEquippable      = canGearBeEquipped( char, gearToEquip );

  const [ wasWeaponEquipped, setWasWeaponEquipped ] = useState( false );

  const [ wasArmorEquipped, setWasArmorEquipped ] = useState( false );

  const onCharacterSelect = ( event ) => {

      if ( itemToUse !== null ) {

        switch ( itemToUse.label ) {

          case `Potion`:

            dispatch( recoverHP( { charId } ) );
                        
            break;

          case `Ether`:

            dispatch( recoverMP( { charId } ) );                

            break;

          case `Antidote`:
          case `Elixir`:

            dispatch( clearStatus( { charId } ) );    

            break;

          default:
            return;

        }
        
        dispatch( decrementItemQty( { itemUsed: itemToUse } ) );

        dispatch( checkItem( itemToUse, deactivateItem ) );

        dispatch( checkCharacter( charId, itemToUse, deactivateItem ) );

      }

      if( gearToEquip !== null ) {

        dispatch( equip( { charId, gearToEquip } ) );

        dispatch( clearGearToEquip() );

        

        if( gearToEquip.symbol.indexOf( 'weapon' ) !== -1 ) {
          console.log('got weapon');
          setWasWeaponEquipped( true );

        } else {
          console.log('got armor');
          setWasArmorEquipped( true );

        }

        console.log(wasArmorEquipped, wasWeaponEquipped);

        //so the flashGear class is removed
        setTimeout( () => {
          setWasWeaponEquipped( false );
          setWasArmorEquipped( false );
        }, 1000 );

      }

  };
 
  
  return (
    <div
      className={ `

        ${ styles.character } 
        ${
          itemToUse && !doesItemApplyToChar
            ? styles.dimCharacter
            : ``
        } 
        ${
          itemToUse && doesItemApplyToChar
            ? styles.applyingToChar
            : ``
        }
        ${
          gearToEquip && !isGearEquippable
            ? styles.dimCharacter
            : ``
        }
        ${
          gearToEquip && isGearEquippable
            ? styles.applyingToChar
            : ``
        }

      ` }

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
              className={ `

                ${ styles.weapon }
                ${ wasWeaponEquipped ? styles.flashGear : `` }
                
              ` }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch( openMenu( { menu: "weapons" } ) );
              } }
            >
              <Icon 
                symbol={ char.gear.weapon.symbol } 
                label={ char.gear.weapon.label } 
              /> { char.gear.weapon.label }
            </div>
            <div
              className={ `

                ${ styles.armor }
                ${ wasArmorEquipped ? styles.flashGear : `` }
                
              ` }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch( openMenu( { menu: "armor" } ) );
              } 
              }>
              <Icon 
                symbol={ char.gear.armor.symbol } 
                label={ char.gear.armor.label } 
              /> { char.gear.armor.label }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
