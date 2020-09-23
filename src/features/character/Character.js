import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../../icons/Icon";

import { openMenu } from "../menu/menuSlice";
import { recoverHP, recoverMP, clearStatus } from './characterSlice';

import { OPEN_MENU } from "../menu/types";

import { getCharacterSymbolPath, getCharacterIconLabel, canItemBeUsed } from './utils';

import styles from "./Character.module.css";
import { CLEAR_STATUS, RECOV_HP, RECOV_MP } from "./types";

export function Character({ 
  char, applyingItem, itemToUse = null 
}) {
  
  const dispatch = useDispatch();
  
  const onCharacterSelect = (itemToUse) => {
    switch(itemToUse.label) {
      case `Potion`:
        dispatch(recoverHP({type: RECOV_HP, charId: char.id}));
        break;
      case `Ether`:
        dispatch(recoverMP({type: RECOV_MP, charId: char.id}));
        break;
      case `Antidote`:
      case `Elixir`:
        dispatch(clearStatus({type: CLEAR_STATUS, charId: char.id}));
        break;
      default:
        return;
    }
  }
  
  return (
    <div 
      className={`${styles.character} ${(applyingItem && !canItemBeUsed(char, itemToUse)) ? styles.dimCharacter : ``}`} 
      onClick={() => onCharacterSelect(itemToUse)}
    >
      <div className={styles.charIcon}>
        <Icon symbol={getCharacterSymbolPath(char)} label={getCharacterIconLabel(char)} />        
        {char.status && <Icon status={char.status} symbol={`status.${char.status}`} label={`${char.status}`} />}
      </div>
      <div className={styles.charDetails}>
        <h2>
          {char.name} L.<span>{char.stats.level.current}</span>
          
        </h2>
        
        <div className={styles.charStats}>
          <div className={styles.mainCharStats}>
            <span>
              HP:{char.stats.hp.current}/{char.stats.hp.max}
            </span>
            <span>
              MP:{char.stats.mp.current}/{char.stats.mp.max}
            </span>
            <span>
              XP:{char.stats.level.exp}/{char.stats.level.next}
            </span>
            
          </div>
          <div className={styles.gear}>
            <div
              className={styles.weapon}
              onClick={(e) => {
                dispatch(openMenu({ type: OPEN_MENU, menu: "weapons" }));
              }}
            >
              <Icon symbol="item.weapon.sword" label="sword" /> Wood
            </div>
            <div
              className={styles.armor}
              onClick={(e) => {
                dispatch(openMenu({ type: OPEN_MENU, menu: "armor" }));
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
