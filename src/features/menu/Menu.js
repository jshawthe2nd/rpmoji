import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Menu.module.css";

import { selectMenu, openMenu, closeMenu } from "./menuSlice";
import { OPEN_MENU } from "./types";

import { WeaponMenu } from "./WeaponMenu";
import { ArmorMenu } from "./ArmorMenu";
import { ItemMenu } from "./ItemMenu";
import { Icon } from "../../icons/Icon";
import { BackOption } from "./BackOption";

const menuOptions = {
  items: {
    label: "Items",
    component: <ItemMenu />,
  },
  weapons: {
    label: "Weapons",
    component: <WeaponMenu />,
  },
  armor: {
    label: "Armor",
    component: <ArmorMenu />,
  },
  entries: ["items", "weapons", "armor"],
};

export function Menu() {
  const menu = useSelector(selectMenu);
  const SubMenu = !menu ? false : menuOptions[menu].component;
  const dispatch = useDispatch();
  return (
    <div className={styles.menu}>
      {SubMenu
        ? SubMenu
        : menuOptions.entries.map((entry, index) => {
            return (
              <div
                key={index}
                className={styles.menuOption}
                onClick={() => {
                  dispatch(openMenu({ type: OPEN_MENU, menu: entry }));
                }}
              >
                {menuOptions[entry].label}
              </div>
            );
          })}
      {menu && <BackOption dispatch={dispatch} action={closeMenu} />}
      <div className={styles.metaInfo}>
        <p>
          <Icon symbol="menu.gold" label="gold" /> 666
        </p>
        <p><Icon symbol="menu.loc" label="location" /> Tower City</p>
      </div>
    </div>
  );
}
