import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import partyReducer from '../features/party/partySlice';

export default configureStore({
    reducer: {
        game: null,
        party: partyReducer,
        battle: null,
        shop: null,
        quest: null,
        menu: menuReducer
    }
});