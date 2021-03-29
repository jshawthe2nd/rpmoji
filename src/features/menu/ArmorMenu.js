import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { selectAllArmor } from '../party/partySlice';



export function ArmorMenu() {

  const armors = useSelector( selectAllArmor );


  return (
    <div>
      {armors.map((armor, index) => {
        return (<div key={index} className={styles.subMenuOption}><Icon symbol={`item.${armor.type}`} label={armor.name} />{armor.name} &times; {armor.qty}</div>)
      })}
    </div>
  );
}