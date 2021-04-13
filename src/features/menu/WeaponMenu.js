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
  equip,
  setEquippingCharacter
} from '../party/partySlice';

import {
  canGearBeEquipped
} from '../character/characterUtils';

import {
  selectMenuRef,
  closeMenu
} from '../menu/menuSlice';

import {
  gearSelected
} from '../menu/menuActions';



export function WeaponMenu() {

  const dispatch        = useDispatch();

  const weapons         = useSelector( selectAllWeapons );

  const equippingCharacter = useSelector( selectEquippingCharacter );

  const char = useSelector( ( state ) => {

    return state.party.characters[ equippingCharacter ];

  } );

  

  const onGearSlotClick   = ( weapon ) => {

    dispatch( gearSelected( weapon ) );

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
          onClick={ (e) => { onGearSlotClick( weapon ) } }>
            <Icon symbol={ weapon.symbol } label={ weapon.label } />
            { weapon.label } &times; { weapon.qty }
          </div>
        )
      } ) }
    </div>
  );
}