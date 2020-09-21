import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_ACTIVE_ITEM, SET_APPLY_ITEM } from './types';
import { activateItem, selectItems, setApplyItem } from '../party/partySlice';
import styles from "./Menu.module.css";

import { Icon } from "../../icons/Icon";


export function ItemMenu() {
  
  const items = useSelector(selectItems);  
  const dispatch = useDispatch();

  const onItemClick = (index) => {
    dispatch(setApplyItem({type: SET_APPLY_ITEM, applying: true}));
    dispatch(activateItem({type: SET_ACTIVE_ITEM, item: index}));
    
  }
  return (
    <div>
      {items.map((item, index) => {
        
        return (
          <div 
            key={index} 
            className={styles.subMenuOption} 
            onClick={e => onItemClick(index)}
          >
            <Icon 
              cssClass={`in-menu`}
              symbol={item.symbol} 
              label={item.label} 
            />
            {item.label} &times; {item.qty}
          </div>
        );
      })}
    </div>
  );
}
