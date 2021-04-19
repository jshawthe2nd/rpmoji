import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../icons/Icon";

import { SpellMenu } from '../menu/SpellMenu';

import { openMenu } from "../menu/menuSlice";

import {
  selectActiveItem,
  setEquippingCharacter
} from "../party/partySlice";

import {
  selectMenuRef
} from '../menu/menuSlice';

import {
  getCharacterSymbolPath,
  getCharacterIconLabel,
  canTheyUseIt
} from "./characterUtils";

import {
  characterSelected
} from './characterActions';


import styles from "./Character.module.css";

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

  const [ wasWeaponEquipped,  setWasWeaponEquipped ] = useState( false );

  const [ wasArmorEquipped,   setWasArmorEquipped ]  = useState( false );

  const [ openedWeaponMenu,   setOpenedWeaponMenu ]  = useState( false );

  const [ openedArmorMenu,    setOpenedArmorMenu ]   = useState( false );

  const [ openedSpellsMenu,   setOpenedSpellsMenu ]  = useState( false );

  const [ castingCharacter,   setCastingCharacter ]  = useState( { } );

  const onCharacterSelect = ( event ) => {

    dispatch( characterSelected( charId, {} ) );  

  };

  const onGearSlotSelect = ( slot ) => {  

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
      <h2>
          {char.name} L.<span>{ char.stats.level.current }</span>
        </h2>
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
                onGearSlotSelect( `weapons` ) 
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
                onGearSlotSelect( `armor` ) 
              } }>
              <Icon 
                symbol={ char.gear.armor.symbol } 
                label={ char.gear.armor.label } 
              /> { char.gear.armor.label }
            </div>
            { char.charType === 2 && ( <div
              className={ `

                ${ styles.spells }
                
              ` }
              onClick={ ( e ) => {
                e.preventDefault();
                e.stopPropagation();
                setOpenedSpellsMenu( true );
                setCastingCharacter( char );
              } }>
              <Icon 
                symbol={ `magic.scroll` } 
                label={ `Spells` } 
              /> Spells
            </div> ) }
            
          </div>
        </div>
      </div>
      <SpellMenu spells={ [] } />
    </div>
    
  );
}
