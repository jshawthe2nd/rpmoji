import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { 
  selectAllArmor, 
  selectGearToEquip, 
  setArmorToEquip, 
  clearGearToEquip,
  selectEquippingCharacter,
  removeFromInventory,
  addToInventory,
  equip
} from '../party/partySlice';

import {
  canGearBeEquipped
} from '../character/utils';

import {
  selectMenuRef,
  closeMenu
} from '../menu/menuSlice';



export function ArmorMenu() {

  const dispatch            = useDispatch();

  const armors              = useSelector( selectAllArmor );

  const armorToEquip        = useSelector( selectGearToEquip );

  const menuRef             = useSelector( selectMenuRef );

  const equippingCharacter  = useSelector( selectEquippingCharacter );

  const char = useSelector( ( state ) => {

    return state.party.characters[ equippingCharacter ];

  } );


  const onArmorClick = ( armor ) => {

    if( !armorToEquip ) {

      if( menuRef === 'character' && equippingCharacter ) {
        //
        //  If the menu was originally opened from the 
        //  character's armor slot, just equip
        //

        dispatch( equip( { 

          charId: equippingCharacter, 
          gearToEquip: armor

        } ) );

        dispatch( removeFromInventory( { gearItem: armor } ) );        

        dispatch( addToInventory( 
          { 
            gearItem: { ...char.gear[ 'armor' ] } 
          }
        ) );

        dispatch( closeMenu() );

      } else {
        //
        //  Notify characters to receive armor
        //

        dispatch( setArmorToEquip( { armor } ) );

      }  

    } else {

      dispatch( clearGearToEquip() );

    }

  };


  return (

    <div>

      { armors.map( ( armor, index ) => {

        const canEquip = canGearBeEquipped( char, armor );

        return (
          <div 
            key={ index } 
            className={ `

              ${ styles.subMenuOption }
              ${
                equippingCharacter && !canEquip
                  ? styles.dimItem
                  : ``
              }
              
            ` }
            onClick={ (e) => { onArmorClick( armor ) } }
          >
              <Icon symbol={ `item.${ armor.type }` } label={ armor.label } />
              { armor.label } &times; {armor.qty}
          </div>
        )

      } ) }

    </div>

  );

}