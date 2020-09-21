import React from 'react';
import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

/**
 * 
 */

const weapons = [
  {
    symbol: 'item.weapon.sword',
    label: 'Wood',
    qty: 1
  },
  {
    symbol: 'item.weapon.bow',
    label: 'Branch',
    qty: 1
  },
  {
    symbol: 'item.scroll',
    label: 'Fire',
    qty: 1
  },
  {
    symbol: 'item.weapon.dagger',
    label: 'Wood',
    qty: 1
  }
];

export function WeaponMenu() {
  return (
    <div>
      {weapons.map((weapon, index) => {
        return (<div key={index} className={styles.subMenuOption}><Icon symbol={weapon.symbol} label={weapon.label} />{weapon.label} &times; {weapon.qty}</div>)
      })}
    </div>
  );
}