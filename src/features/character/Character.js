import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../icons/Icon";

import { openMenu } from "../menu/menuSlice";

//TODO: - Combine recover methods
//      - combine add/remove inventory to swapInventory
//      

import {
  selectActiveItem,
  selectGearToEquip,
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

  const doesItemApplyToChar   = canTheyUseIt( char, itemToUse ); 

  console.log(doesItemApplyToChar);

  //const gearToEquip           = useSelector( selectGearToEquip );

  //const isGearEquippable      = canGearBeEquipped( char, gearToEquip );

  const [ wasWeaponEquipped,  setWasWeaponEquipped ] = useState( false );

  const [ wasArmorEquipped,   setWasArmorEquipped ]  = useState( false );

  const [ openedWeaponMenu,   setOpenedWeaponMenu ]  = useState( false );

  const [ openedArmorMenu,    setOpenedArmorMenu ]   = useState( false );

  const onCharacterSelect = ( event ) => {

    dispatch( characterSelected( charId, {} ) );  

  };

  const onGearSlotSelect = ( event, slot ) => {

    switch( slot ) {

      case `weapons`:

        setOpenedWeaponMenu( true );

      break;

      case `armor`:

        setOpenedArmorMenu( true );

      break;

      default:
        return;

    }

    dispatch( 
      openMenu( { menu: slot, ref: 'character' } ) 
    );

    dispatch( setEquippingCharacter( { charId } ) );

  }
 
  
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
              onClick={ ( e ) => onGearSlotSelect( `weapons` ) }
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
              onClick={ ( e ) => onGearSlotSelect( `armor` ) }>
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
