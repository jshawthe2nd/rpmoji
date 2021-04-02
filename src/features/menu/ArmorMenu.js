import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { 
  selectAllArmor, 
  selectGearToEquip, 
  setArmorToEquip, 
  clearGearToEquip 
} from '../party/partySlice';



export function ArmorMenu() {

  const dispatch  = useDispatch();

  const armors    = useSelector( selectAllArmor );

  const armorToEquip  = useSelector( selectGearToEquip );

  const onArmorClick  = ( armor ) => {

    if( !armorToEquip ) {

      dispatch( setArmorToEquip( { armor } ) );

    } else {

      dispatch( clearGearToEquip() );

    }

  };


  return (
    <div>
      { armors.map( ( armor, index ) => {
        return (
          <div 
            key={ index } 
            className={ styles.subMenuOption }
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