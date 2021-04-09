import {
    getTypeOfItem
  } from '../party/partyUtils';

export const checkCharacter = ( charId, itemUsed, deactivateItem ) => {
    
    return( dispatch, getState ) => {

        const state = getState().party;

        const char = state.characters[ charId ];

        switch( itemUsed.label ) {

            case `Potion`:

                if( char.stats.hp.current === char.stats.hp.max ) {

                    dispatch( deactivateItem() );

                }

            break;

            case `Ether`:

                if( char.stats.mp.current === char.stats.mp.max ) {

                    dispatch( deactivateItem() );

                }

            break;

            case `Antidote`:
            case `Elixir`:

                if( !char.status ) {

                    dispatch( deactivateItem() );

                }

            break;

            default:

            return;

        }

    };
}

export const characterSelected = ( characterId, actions ) => {

    return ( dispatch, getState ) => {

        const state = getState().party;

        const selectedItem = state.selectedItem;

        const character = state.characters[ characterId ];

        switch( getTypeOfItem( selectedItem ) ) {

            case `item`:

                dispatch( actions.useItem( {

                    char: character,
                    item: selectedItem

                } ) );

                dispatch( checkCharacter( 

                    characterId, 
                    selectedItem, 
                    actions.deactivateItem 

                ) );
            
            break;

            case `gear`:

                dispatch( actions.equip( {

                    char: character,
                    gear: selectedItem

                } ) );

            break;

            case `magic`:

                dispatch( actions.learnSpell( {

                    scroll: selectedItem

                } ) );

            break;

            default:
                return;

        }

        dispatch( actions.resetUI() );

    }

}