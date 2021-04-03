import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Menu.module.css";

import { selectMenu, openMenu, closeMenu } from "./menuSlice";
import { 
  deactivateItem, 
  clearGearToEquip, 
  selectGearToEquip, 
  selectActiveItem, 
  selectEquippingCharacter 
} from '../party/partySlice';

import { WeaponMenu } from "./WeaponMenu";
import { ArmorMenu } from "./ArmorMenu";
import { ItemMenu } from "./ItemMenu";
import { Icon } from "../../icons/Icon";
import { BackOption } from "./BackOption";

const menuOptions = {
  
  weapons: {
    label: "Weapons",
    component: <WeaponMenu />,
  },
  armor: {
    label: "Armor",
    component: <ArmorMenu />,
  },
  items: {
    label: "Items",
    component: <ItemMenu />,
  },

  entries: [ "weapons", "armor", "items" ],

};

export function Menu() {

  const menu          = useSelector( selectMenu );
  const activeItem    = useSelector( selectActiveItem );
  const gearToEquip   = useSelector( selectGearToEquip );
  const equippingCharacter = useSelector( selectEquippingCharacter );

  const SubMenu       = !menu ? false : menuOptions[ menu ].component;

  const dispatch      = useDispatch();

  const onMenuClosed = () => {

    dispatch( closeMenu( {} ) );

    if( activeItem ) {

      dispatch( deactivateItem( {} ) );

    }
    
    if( gearToEquip ) {

      dispatch( clearGearToEquip() );

    }




    
  };

  return (
    <div className={ styles.menu }>
      {SubMenu
        ? SubMenu
        : menuOptions.entries.map( ( entry, index ) => {
            return (
              <div
                key={ index }
                className={ styles.menuOption }
                onClick={ () => {
                  dispatch( openMenu( { menu: entry } ) );
                } }
              >
                { menuOptions[ entry ].label }
              </div>
            );
          })}
      { menu && <BackOption onMenuClosed={ onMenuClosed } />}
      <div className={ styles.metaInfo }>
        <p>
          <Icon symbol="menu.gold" label="gold" /> 666
        </p>
        <p><Icon symbol="menu.loc" label="location" /> Tower City</p>
      </div>
    </div>
  );
}
