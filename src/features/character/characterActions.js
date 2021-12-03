import {
    decrementItemQty,
    deactivateItem,
    deactivateSpell,
    equip,
    recoverHP,
    recoverMP,
    reduceHP,
    reduceMP,
    clearStatus,
    addToInventory,
    removeFromInventory
} from '../party/partySlice';

import {
    getTypeOfItem
  } from '../party/partyUtils';

import {
    checkItem
} from '../party/partyActions';

export const checkCharacter = ( charId, healer ) => {
    
    return( dispatch, getState ) => {

        const state = getState().party;

        const char = state.characters[ charId ];

        switch( determineCharacterAction( state ) ) {

            case 1:

                switch( healer.label ) {

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

            break;

            case 2:

                switch( healer.type ) {

                    case 'cure':

                        const stat = healer.stat;

                        if( char.stats[stat].current === char.stats[stat].max ) {
        
                            dispatch( deactivateSpell() );
        
                        }

                    break;

                    default:
                        return;

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

        const character = state.characters[ characterId ];

        console.log(state);

        switch( determineCharacterAction( state ) ) {

            // using item
            case 1:

                const selectedItem = state.activeItem;

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

            break;

            //casting spell
            case 2:

                dispatch( castSpell( character.id, state.castingCharacter ) );

                dispatch( deactivateSpell() );

            break;

            default:
                return;

        }

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


/**
 * 
 * 
 */

export const learnSpell = ( characterId, scroll ) => {

    return( dispatch, getState ) => {

        const state = getState().party;

        const character = state.characters[ characterId ];

        const spell = {
            ...scroll,
            symbol: scroll.spellSymbol
        };

        switch( scroll.type ) {

            case 'heal':

                spell.heal = Math.floor( ( character.stats.level.current * 10 ) / 2 ) + ( character.stats.level.current + scroll.power );

            break;

            case 'atk':

                spell.atk = Math.floor( character.stats.level.current * 10 + ( character.stats.level.current + scroll.power ) );

            break;
            default:
                return;

        }    

        character.spells.push( spell );

        dispatch( removeFromInventory( scroll ) );

    }

}

export const castSpell = ( target, caster ) => {

    return( dispatch, getState ) => {

        const state = getState().party;

        const character = state.characters[ target ];

        const stat = state.activeSpell.stat;

        const recoverySpell = 'recover' + stat.toUpperCase();

        switch( stat ) {

            case 'hp':

                dispatch( recoverHP( { charId: character.id } ) );

            break;

        }

        dispatch( reduceMP( { charId: caster } ) );
        

    }

}

const determineCharacterAction = ( state ) => {

    if( state.applyingItem || state.gearToEquip !== null ) {

        return 1;

    }
    
    if( state.castingSpell ) {

        return 2;

    }

}