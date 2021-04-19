import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import styles from './Menu.module.css';

import { Icon } from '../../icons/Icon';



export function SpellMenu( { ...props } ) {


  const dispatch        = useDispatch();

  const onSpellClick   = ( spell ) => {

    

  };

  const spells = [
    {
        type: 'atk',
        cost: 4,
        dmg: 8,
        symbol: 'spell.ice',
        label: 'Ice'
      },
      {
        type: 'cure',
        cost: 6,
        // possible formula for calculating heal:
        // (level * 10 / 2) + (cost / 2) 
        heal: ((1 * 10 /2 ) + (6 / 2)) + (Math.floor(Math.random() * Math.floor((1 * 10 / 2)))),
        
        symbol: 'spell.cure',
        label: 'Cure'
      }
  ];


  return (
    <div className={ styles.spellMenu }>
      { spells.map( ( spell, index ) => {

        return (
          <div key={ index } 
          className={ `
          
            ${ styles.subMenuOption }

          ` } 
          onClick={ (e) => { onSpellClick( spell ) } }>
            <Icon symbol={ spell.symbol } label={ spell.label } />
            { spell.label }
          </div>
        )
      } ) }
    </div>
  );
}