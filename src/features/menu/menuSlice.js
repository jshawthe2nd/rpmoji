import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
    ref: false
  },
  reducers: {

    openMenu: ( state, action ) => {
      
      state.menu = action.payload.menu;

      if( action.payload.ref ) {

        state.ref = action.payload.ref;

      }

    },
    closeMenu: ( state, action ) => {

      state.menu = slice.initialState;
      state.ref = false;

    },
    
  },
});

export const { openMenu, closeMenu } = slice.actions;

export const selectMenu = ( state ) => state.menu.menu;

export const selectMenuRef = state => state.menu.ref;

export const selectItem = ( state, itemIndex ) => {

  return state.party.item[ itemIndex ];
  
}

export default slice.reducer;
