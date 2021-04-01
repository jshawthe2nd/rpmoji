export const checkCharacter = ( charId, itemUsed, deactivateItem ) => {
    
    return( dispatch, getState ) => {

        const state = getState().party;

        const char = state.chars2[ charId ];

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