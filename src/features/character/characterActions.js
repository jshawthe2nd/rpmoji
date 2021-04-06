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

export const characterSelected = ( characterId, actions, utils ) => {

    return ( dispatch, getState ) => {

        const state = getState().party;

        const character = state.characters[ characterId ];

        const selectedItem = state.selectedItem;

        const selectedType = utils.getTypeOfItem = ( selectedItem );

        switch( selectedType ) {

            case `item`:

                dispatch( actions.useItem() );
            
            break;

            case `gear`:


            break;

            case `scroll`:


            break;

            default:
                return;

        }

    }

}