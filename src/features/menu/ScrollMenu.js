import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';

import { 
  selectAllScrolls,
  selectEquippingCharacter
} from '../party/partySlice';

import {
  canTheyUseIt
} from '../character/characterUtils';

import {
  gearSelected
} from '../menu/menuActions';



export function ScrollMenu() {

  const dispatch        = useDispatch();

  const scrolls         = useSelector( selectAllScrolls );

  const equippingCharacter = useSelector( selectEquippingCharacter );

  const char = useSelector( ( state ) => {

    return state.party.characters[ equippingCharacter ];

  } );

  const onGearSlotClick   = ( scroll ) => {

    dispatch( gearSelected( scroll ) );

  };


  return (
    <div>
      { scrolls.map( ( scroll, index ) => {

        const canLearn = canTheyUseIt( char, scroll );

        return (
          <div key={ index } 
          className={ `
          
            ${ styles.subMenuOption }
            ${
              equippingCharacter && !canLearn
                ? styles.dimItem
                : ``
            }

          ` } 
          onClick={ (e) => { onGearSlotClick( scroll ) } }>
            <Icon symbol={ scroll.symbol } label={ scroll.label } />
            { scroll.label } &times; { scroll.qty }
          </div>
        )
      } ) }
    </div>
  );
}