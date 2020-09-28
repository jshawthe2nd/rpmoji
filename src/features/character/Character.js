import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../icons/Icon";

import { openMenu } from "../menu/menuSlice";
import { recoverHP, recoverMP, clearStatus, decrementItemQty } from '../party/partySlice';

import { getCharacterSymbolPath, getCharacterIconLabel, canItemBeUsed } from './utils';

import styles from "./Character.module.css";

export function Character({ 
  charId, 
  applyingItem, 
  itemToUse = null
}) {
  
  const dispatch = useDispatch();

  const char = useSelector(state => state.party.chars.find(c => c.id === charId));
  
  console.log(applyingItem);
  
  const onCharacterSelect = (event, itemToUse) => {
    
    if(itemToUse !== null) {
      switch(itemToUse.label) {
        case `Potion`:
          dispatch(recoverHP({charId: char.id}));
          break;
        case `Ether`:
          dispatch(recoverMP({charId: char.id}));
          break;
        case `Antidote`:
        case `Elixir`:
          dispatch(clearStatus({charId: char.id}));
          break;
        default:
          return;
      }
      dispatch(decrementItemQty({itemUsed: itemToUse}));
    }
    
  }
  
  return (
    <div 
      className={`${styles.character} ${(applyingItem && !canItemBeUsed(char, itemToUse)) ? styles.dimCharacter : ``} ${(applyingItem && canItemBeUsed(char, itemToUse)) ? styles.applyingToChar : ``}`} 
      onClick={(e) => onCharacterSelect(e, itemToUse)}
    >
      <div className={styles.charIcon}>
        <Icon 
          symbol={getCharacterSymbolPath(char)} 
          label={getCharacterIconLabel(char)} 
        />        
        {char.status && 
        <Icon 
          status={char.status} 
          symbol={`status.${char.status}`} 
          label={`${char.status}`} 
        />}
      </div>
      <div className={styles.charDetails}>
        <h2>
          {char.name} L.<span>{char.stats.level.current}</span>
          
        </h2>
        
        <div className={styles.charStats}>
          <div className={styles.mainCharStats}>
            <div className="hp-mp">
              <span>HP:{char.stats.hp.current}/{char.stats.hp.max}</span>
              {char.charType === 2 && <span>MP:{char.stats.mp.current}/{char.stats.mp.max}</span>}
            </div>
            
            <div className="xp">
              <span>
                XP:{char.stats.level.exp}/{char.stats.level.next}
              </span>
            </div>
            
            
            
          </div>
          <div className={styles.gear}>
            <div
              className={styles.weapon}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(openMenu({ menu: "weapons" }));
              }}
            >
              <Icon symbol="item.weapon.sword" label="sword" /> Wood
            </div>
            <div
              className={styles.armor}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(openMenu({ menu: "armor" }));
              }}
            >
              <Icon symbol="item.armor" label="armor" /> Leather
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
