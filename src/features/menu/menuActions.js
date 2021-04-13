import {
    closeMenu
} from './menuSlice';

import {
    equip,
    removeFromInventory,
    addToInventory,
    setWeaponToEquip,
    clearGearToEquip,
    setEquippingCharacter
} from '../party/partySlice';

import {
    getTypeOfItem
} from '../party/partyUtils';

export const gearSelected = ( gear ) => {

    return( dispatch, getState ) => {

        const party = getState().party;

        const menu = getState().menu;

        const { gearToEquip, equippingCharacter } = party;

        const char = party.characters[ equippingCharacter ];

        const { ref } = menu;

        const gearType = getTypeOfItem( gear );

        if( gearType === 'scroll' ) return false;

        if( !gearToEquip ) {

            if( ref === 'character' && equippingCharacter ) {

                //
                //  If the menu was originally opened from the 
                //  character's weapon slot, just equip
                //

                dispatch( equip( { 

                    id: equippingCharacter, 
                    gear
        
                } ) );
        
                dispatch( removeFromInventory( { gearItem: gear } ) );        
        
                dispatch( addToInventory( 
                    { 
                        gearItem: { ...char.gear[ gearType ] } 
                    }
                ) );
        
                dispatch( setEquippingCharacter( { charId: null } ) );
        
                dispatch( closeMenu() );

            } else {
                //
                //  Notify characters to receive weapon
                //

                dispatch( setWeaponToEquip( { gear } ) );

            }

        } else {

            dispatch( clearGearToEquip() );

        }

    }

}