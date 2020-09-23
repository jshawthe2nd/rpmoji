import { createSlice } from "@reduxjs/toolkit";

import {default as characterReducers } from "./characterReducers";

export const slice = createSlice({
  name: "character",
  initialState: {
    id: 123,
    name: "Dirk",
    charType: 1,
    gender: 1,
    stats: {
      hp: {
        current:
          (2 * 10) / 2 +
          6 / 2 +
          Math.floor(Math.random() * Math.floor((2 * 10) / 2)),
        max: 50,
      },
      mp: {
        current: 0,
        max: 0,
      },
      level: {
        current: 1,
        exp: 5,
        next: 50,
      },
    },
    gear: {
      weapon: {
        type: "sword",
        dmg: 10,
        name: "Wood",
      },
      armor: {
        name: "Leather",
        def: 5,
      },
    },
    status: "poison",
  },
  reducers: {
    ...characterReducers
  },
});


export const {
  attack,
  defend,
  equip,
  applyItem,
  levelUp,
  gainExp,
  afflictStatus,
  clearStatus,
  recoverHP,
  recoverMP,
} = slice.actions;

export const selectWeapon = (state) => {};

export const selectArmor = (state) => {};

export const selectHp = (state) => {};

export const selectMP = (state) => {};

export const selectExp = (state) => {};

export const selectChar = (state) => state.character;

export default slice.reducer;
