import {
    decrementItemQty,
    deactivateItem,
    equip,
    recoverHP,
    recoverMP,
    clearStatus
} from '../party/partySlice';

import {
    getTypeOfItem
  } from '../party/partyUtils';

export const checkCharacter = ( charId, itemUsed ) => {
    
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

        const selectedItem = state.activeItem;

        const character = state.characters[ characterId ];

        switch( getTypeOfItem( selectedItem ) ) {

            case `item`:

                dispatch( useItem( character ) );

                dispatch( checkCharacter( 

                    characterId, 
                    selectedItem, 
                    deactivateItem 

                ) );
            
            break;

            case `gear`:

                dispatch( equip( {

                    char: character,
                    gear: selectedItem

                } ) );

            break;

            case `magic`:

                dispatch( actions.learnSpell( {

                    char: character,
                    scroll: selectedItem

                } ) );

            break;

            default:
                return;

        }

        dispatch( checkCharacter( characterId, selectedItem ) );

        //dispatch( deactivateItem( {} ) );

    }

}

const useItem = ( character ) => {

    return ( dispatch, getState ) => {

        const state = getState().party;

        const item = state.activeItem;

        console.log(character);

        switch( item.label ) {

            case `Potion`:

                dispatch( recoverHP( { charId: character.id } ) );

            break;

            case `Ether`:

                dispatch( recoverMP( { charId: character.id } ) );

            break;

            case `Antidote`:
            case `Elixir`:

                dispatch( clearStatus( { charId: character.id } ) );

            break;

        }

    };

}