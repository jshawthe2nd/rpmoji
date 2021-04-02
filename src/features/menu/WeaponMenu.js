import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { 
  selectAllWeapons, 
  selectWeaponToEquip, 
  setWeaponToEquip, 
  clearGearToEquip 
} from '../party/partySlice';



export function WeaponMenu() {

  const dispatch  = useDispatch();

  const weapons   = useSelector( selectAllWeapons );

  const weaponToEquip   = useSelector( selectWeaponToEquip );

  const onWeaponClick   = ( weapon ) => {

    console.log( weapon );

    if( !weaponToEquip ) {

      dispatch( setWeaponToEquip( { weapon }) );

    } else {

      dispatch( clearGearToEquip() );

    }

  };


  return (
    <div>
      { weapons.map( ( weapon, index ) => {
        return (
          <div key={ index } className={ styles.subMenuOption } 
          onClick={ (e) => { onWeaponClick( weapon ) } }>
            <Icon symbol={ weapon.symbol } label={ weapon.name } />
            { weapon.name } &times; { weapon.qty }
          </div>
        )
      } ) }
    </div>
  );
}