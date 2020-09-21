import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../features/character/characterSlice';
import menuReducer from '../features/menu/menuSlice';
import partyReducer from '../features/party/partySlice';

export default configureStore({
    reducer: {
        game: null,
        party: partyReducer,
        character: characterReducer,
        battle: null,
        shop: null,
        quest: null,
        menu: menuReducer
    }
});