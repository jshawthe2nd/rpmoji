import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menu/menuSlice';
import partyReducer from '../features/party/partySlice';
import gameReducer from '../features/game/gameSlice';

export default configureStore({
    reducer: {
        game: gameReducer,
        party: partyReducer,
        battle: null,
        shop: null,
        quest: null,
        menu: menuReducer
    }
});