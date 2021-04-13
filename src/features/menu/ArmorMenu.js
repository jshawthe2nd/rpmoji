import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { 
  selectAllArmor, 
  selectEquippingCharacter
} from '../party/partySlice';

import {
  canGearBeEquipped
} from '../character/characterUtils';

import {
  gearSelected
} from '../menu/menuActions';



export function ArmorMenu() {

  const dispatch            = useDispatch();

  const armors              = useSelector( selectAllArmor );

  const equippingCharacter  = useSelector( selectEquippingCharacter );

  const char = useSelector( ( state ) => {

    return state.party.characters[ equippingCharacter ];

  } );


  const onGearSlotClick   = ( armor ) => {

    dispatch( gearSelected( armor ) );

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
            onClick={ (e) => { onGearSlotClick( armor ) } }
          >
              <Icon symbol={ `gear.${ armor.type }` } label={ armor.label } />
              { armor.label } &times; { armor.qty }
          </div>
        )

      } ) }

    </div>

  );

}