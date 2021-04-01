import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { selectAllWeapons, selectWeaponToEquip } from '../party/partySlice';



export function WeaponMenu() {

  const dispatch  = useDispatch();

  const weapons   = useSelector( selectAllWeapons );

  const weaponToEquip   = useSelector( selectWeaponToEquip );

  const onWeaponClick   = ( ) => {

    // if( !weaponToEquip ) {

    //   dispatch( setWeaponToEquip() );

    // } else {

    //   dispatch( clearWeaponToEquip() );

    // }

  };


  return (
    <div>
      { weapons.map( ( weapon, index ) => {
        return (
          <div key={ index } className={ styles.subMenuOption }>
            <Icon symbol={ weapon.symbol } label={ weapon.name } />
            { weapon.name } &times; { weapon.qty }
          </div>
        )
      } ) }
    </div>
  );
}