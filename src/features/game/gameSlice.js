import { createSlice } from '@reduxjs/toolkit';

import gameReducers from './gameReducers';

export const slice = createSlice( {

    name: 'game',
    initialState: {
        mode: 'menu',
        dungeon: false,
        paused: false,
        world: {
            regions: [
                {
                    name: 'Hero Plains',
                    coords: [
                        [ 0, 0 ],
                        [ 800, 0 ],
                        [ 800, 600 ],
                        [ 0, 600 ]
                    ],
                    tiles: [
                        {
                            file: 'somefile.jpg',
                            coords: [ 
                                [ 0, 0 ],
                                [ 400, 0 ],
                                [ 400, 300 ],
                                [ 0, 300 ]
                            ],
                            dungeons: [
                                [ 150, 450 ],
                                [ 700, 100 ]
                            ]
                        }
                    ]
                }
            ]
        }
    },
    reducers: {
        ...gameReducers
    }
} );

export const {
    pauseGame
} = slice.actions;

export const isGamePaused = state => state.paused;

export default slice.reducer;