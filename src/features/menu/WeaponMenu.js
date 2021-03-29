import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { selectAllWeapons } from '../party/partySlice';



export function WeaponMenu() {

  const weapons = useSelector( selectAllWeapons );


  return (
    <div>
      {weapons.map((weapon, index) => {
        return (<div key={index} className={styles.subMenuOption}><Icon symbol={weapon.symbol} label={weapon.name} />{weapon.name} &times; {weapon.qty}</div>)
      })}
    </div>
  );
}