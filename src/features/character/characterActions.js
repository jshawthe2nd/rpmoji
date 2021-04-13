import {
    decrementItemQty,
    deactivateItem,
    equip,
    recoverHP,
    recoverMP,
    clearStatus,
    addToInventory,
    removeFromInventory,
    learnSpell
} from '../party/partySlice';

import {
    getTypeOfItem
  } from '../party/partyUtils';

import {
    checkItem
} from '../party/partyActions';

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

export const characterSelected = ( characterId ) => {

    return ( dispatch, getState ) => {

        const state = getState().party;

        const selectedItem = state.activeItem;

        const character = state.characters[ characterId ];

        switch( getTypeOfItem( selectedItem ) ) {

            case `item`:

                dispatch( useItem( character ) );

                dispatch( checkCharacter( 

                    characterId, 
                    selectedItem

                ) );
            
            break;

            case `gear`:

                dispatch( equipGear( characterId, selectedItem ) );

            break;

            case `magic`:

                dispatch( learnSpell( {

                    char: character,
                    scroll: selectedItem

                } ) );

                dispatch( removeFromInventory( { gearItem: selectedItem } ) );

            break;

            default:
                return;

        }

        dispatch( deactivateItem() );

    }

}

const useItem = ( character ) => {

    return ( dispatch, getState ) => {

        const state = getState().party;

        const item = state.activeItem;

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

            default:
                return;

        }

        dispatch( decrementItemQty( {} ) );

        dispatch( checkItem( item ) );

    };

}

const equipGear = ( id, gear ) => {

    return ( dispatch, getState ) => {

        

        const state = getState().party;

        const character = { ...state.characters[ id ] };

        dispatch( equip( {

            id,
            gear

        } ) );

        dispatch( removeFromInventory( { gearItem: gear } ) );

        dispatch( addToInventory( 

            { 
            gearItem: { ...character.gear[ 
                gear.symbol.indexOf( 'weapon' ) !== -1 ? `weapon` : `armor`
             ] } 

            }

        ) );

    }

}