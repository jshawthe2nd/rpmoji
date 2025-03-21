import {
  getTypeOfItem
} from '../party/partyUtils';

export default {
  incrementItemQty: ( state, action ) => {
    
  },
  decrementItemQty: ( state, action ) => {
    
    const activeItem = state.activeItem;
    
    state.inventory.item.map( ( item, index ) => {

      if( item.id === activeItem.id ) {

        state.inventory.item[index].qty = ( state.inventory.item[ index ].qty - 1 < 0 ) ? 0 : state.inventory.item[ index ].qty - 1;

        state.activeItem.qty = ( state.activeItem.qty - 1 < 0 ) ? 0 : state.activeItem.qty - 1;

        if(state.inventory.item[ index ].qty < 1) {
          
          state.inventory.item[ index ].using = false;
          
        }

        return true;

      }

      return false;

    });
    
  },
  removeFromInventory: ( state, action ) => {

    let gearType;

    const { gearItem } = action.payload;

    switch( gearItem.type ) {

      case `sword`:
      case `axe`:
      case `dagger`:
      case `bow`:

        gearType = 'weapon';

      break;

      case `armor`:
      case `robe`:

        gearType = 'armor';

      break;

      default:
        
        gearType = 'scroll';

        break;

    }

    state.inventory[ gearType ].map( ( gear, index ) => {

      if( gear.id === gearItem.id ) {

        state.inventory[ gearType ].splice( index, 1 );

      }

      return true;

    } );
    
  },
  addToInventory: ( state, action ) => {

    const gearItem = { ...action.payload.gearItem };

    switch( gearItem.type ) {

      case `sword`:
      case `axe`:
      case `dagger`:
      case `bow`:

        //
        //  TODO: in the event there's more than one in current inventory,
        //  find a same item's qty to increment it, otherwise .push it
        //

        state.inventory.weapon.push( { ...gearItem, qty: 1 } );

      break;
      
      default:

        state.inventory.armor.push( { ...gearItem, qty: 1 } );

      break;

    }
    
  },

  activateItem: ( state, action) => {
     
     state.inventory.item.map( ( item, index ) => {

       state.inventory.item[ index ].using = false;
       return true;

     } );

     state.activeItem = state.inventory.item[ action.payload.item ];

     state.inventory.item[ action.payload.item ].using = true;

  },

  deactivateItem: ( state, action ) => {

    state.inventory.item.map( ( item, index ) => {
      
      state.inventory.item[ index ].using = false;
      return true;

    } );

    state.activeItem = null;
    
  },

  deactivateSpell: ( state, action ) => {

    state.activeSpell = null;
    state.castingSpell = false;
    state.castingCharacter = null;
    state.closeMenu = true;

  },

  setApplyItem: ( state, action ) => {

    state.applyingItem = action.payload.applying;

  },

  setWeaponToEquip: ( state, action ) => {

    state.activeItem = action.payload.weapon;

  },

  clearGearToEquip: ( state, action ) => {

    state.activeItem = false;

  },

  setArmorToEquip: ( state, action ) => {

    state.activeItem = action.payload.armor;

  },

  setEquippingCharacter: ( state, action ) => {

    state.equippingCharacter = action.payload.charId;

  },

  setCastingSpell: ( state, action ) => {

    console.log( action );

    state.activeSpell = action.payload.spell;

    state.castingSpell = true;

    state.castingCharacter = action.payload.spellCasterId;

  }
  
}