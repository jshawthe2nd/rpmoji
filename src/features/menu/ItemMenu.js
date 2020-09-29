import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  activateItem,
  selectItems,
  setApplyItem,
  selectActiveItem,
  deactivateItem
} from "../party/partySlice";
import styles from "./Menu.module.css";

import { Icon } from "../../icons/Icon";

export function ItemMenu() {
  const items = useSelector(selectItems);
  const activeItem = useSelector(selectActiveItem);
  const dispatch = useDispatch();
  

  const onItemClick = (index) => {
    if(!activeItem) {
      dispatch(setApplyItem({ applying: true }));
      dispatch(activateItem({ item: index }));
    } else {
      dispatch(deactivateItem({}));
      dispatch(setApplyItem({ applying: false }));
    }
    
  };

  if(activeItem && activeItem.qty < 1) {
    dispatch(setApplyItem({applying: false}));
    dispatch(deactivateItem({}));
  }

  

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`${styles.subMenuOption} ${(item.using) ? styles.usingItem : ``} ${(item.qty < 1) ? styles.disableOption : ``}`} 
            onClick={(e) => {
              if(item.qty > 0) {
                onItemClick(index);
              }
            }}
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
