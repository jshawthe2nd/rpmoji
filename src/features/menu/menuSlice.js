import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
  },
  reducers: {
    openMenu: (state, action) => {
      console.log(state);
      state.menu = action.payload.menu;
    },
    closeMenu: (state, action) => {
      state.menu = slice.initialState;
    },
  },
});

export const { openMenu, closeMenu } = slice.actions;

export const selectMenu = (state) => state.menu.menu;

export const selectItem = (state, itemIndex) => {
  return state.party.item[itemIndex];
}

export default slice.reducer;
