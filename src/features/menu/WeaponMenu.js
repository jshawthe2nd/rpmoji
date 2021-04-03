import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { 
  selectAllWeapons, 
  selectGearToEquip, 
  setWeaponToEquip, 
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



export function WeaponMenu() {

  const dispatch        = useDispatch();

  const weapons         = useSelector( selectAllWeapons );

  const weaponToEquip   = useSelector( selectGearToEquip );

  const menuRef         = useSelector( selectMenuRef );

  const equippingCharacter = useSelector( selectEquippingCharacter );

  const char = useSelector( ( state ) => {

    return state.party.characters[ equippingCharacter ];

  } );

  

  const onWeaponClick   = ( weapon ) => {

    if( !weaponToEquip ) {

      if( menuRef === 'character' && equippingCharacter ) {
        //
        //  If the menu was originally opened from the 
        //  character's weapon slot, just equip
        //

        dispatch( equip( { 

          charId: equippingCharacter, 
          gearToEquip: weapon

        } ) );

        dispatch( removeFromInventory( { gearItem: weapon } ) );        

        dispatch( addToInventory( 
          { 
            gearItem: { ...char.gear[ 'weapon' ] } 
          }
        ) );

        dispatch( closeMenu() );

      } else {
        //
        //  Notify characters to receive weapon
        //

        dispatch( setWeaponToEquip( { weapon } ) );

      }  

    } else {

      dispatch( clearGearToEquip() );

    }

  };


  return (
    <div>
      { weapons.map( ( weapon, index ) => {

        const canEquip = canGearBeEquipped( char, weapon );

        return (
          <div key={ index } 
          className={ `
          
            ${ styles.subMenuOption }
            ${
              equippingCharacter && !canEquip
                ? styles.dimItem
                : ``
            }

          ` } 
          onClick={ (e) => { onWeaponClick( weapon ) } }>
            <Icon symbol={ weapon.symbol } label={ weapon.label } />
            { weapon.label } &times; { weapon.qty }
          </div>
        )
      } ) }
    </div>
  );
}