import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../icons/Icon";

import { openMenu } from "../menu/menuSlice";

//TODO: - Combine recover methods
//      - combine add/remove inventory to swapInventory
//      

import {
  recoverHP,
  recoverMP,
  clearStatus,
  decrementItemQty,
  selectActiveItem,
  deactivateItem,
  selectGearToEquip,
  equip,
  clearGearToEquip,
  addToInventory,
  removeFromInventory,
  setEquippingCharacter
} from "../party/partySlice";

import {
  selectMenuRef
} from '../menu/menuSlice';

import {
  getCharacterSymbolPath,
  getCharacterIconLabel,
  canItemBeUsed,
  canGearBeEquipped,
  canTheyUseIt
} from "./characterUtils";



import {
  checkCharacter,
  characterSelected
} from './characterActions';


import styles from "./Character.module.css";
import { checkItem } from "../party/partyActions";

export function Character( 
  { 
    charId, 
    ...props 
  } 
) 
{

  const dispatch = useDispatch();

  const char = useSelector( ( state ) => {

    return state.party.characters[ charId ];

  } ); 

  const itemToUse             = useSelector( selectActiveItem );

  const menuRef               = useSelector( selectMenuRef );

  const doesItemApplyToChar   = canItemBeUsed( char, itemToUse ); 

  const gearToEquip           = useSelector( selectGearToEquip );

  const isGearEquippable      = canGearBeEquipped( char, gearToEquip );

  const [ wasWeaponEquipped,  setWasWeaponEquipped ] = useState( false );

  const [ wasArmorEquipped,   setWasArmorEquipped ]  = useState( false );

  const [ openedWeaponMenu,   setOpenedWeaponMenu ]  = useState( false );

  const [ openedArmorMenu,    setOpenedArmorMenu ]   = useState( false );

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

      //TODO: We can clean up these big if-blocks by moving them to
      //      actions.js as we'll be able to check state directly
      //      there and dispatch as needed.
      //

      if( gearToEquip !== null ) {

        dispatch( equip( { charId, gearToEquip } ) );

        let sendToInventory;

        if( gearToEquip.symbol.indexOf( 'weapon' ) !== -1 ) {
          
          sendToInventory = 'weapon';
          
          setWasWeaponEquipped( true );

        } else {

          sendToInventory = 'armor';
          
          setWasArmorEquipped( true );

        }

        dispatch( removeFromInventory( { gearItem: gearToEquip } ) );

        dispatch( addToInventory( 
          { 
            gearItem: { ...char.gear[ sendToInventory ] } 
          }
        ) );

        dispatch( clearGearToEquip() );

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
                ${ openedWeaponMenu && menuRef ? styles.openedMenu : `` }
                
              ` }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenedWeaponMenu( true );
                dispatch( 
                  openMenu( { menu: "weapons", ref: 'character' } ) 
                );
                dispatch( setEquippingCharacter( { charId } ) );
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
                ${ openedArmorMenu && menuRef ? styles.openedMenu : `` }
                
              ` }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenedArmorMenu( true );
                dispatch( 
                  openMenu( { menu: "armor", ref: 'character' } ) 
                );
                dispatch( setEquippingCharacter( { charId } ) );
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
