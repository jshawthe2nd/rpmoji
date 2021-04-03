export default {
  incrementItemQty: (state, action) => {
    console.log(action);
  },
  decrementItemQty: (state, action) => {
    
    const { itemUsed } = action.payload;
    
    state.inventory.item.map((item, index) => {

      if(item.label === itemUsed.label) {

        state.inventory.item[index].qty = (state.inventory.item[index].qty - 1 < 0) ? 0 : state.inventory.item[index].qty - 1;

        state.activeItem.qty = (state.activeItem.qty - 1 < 0) ? 0 : state.activeItem.qty - 1;

        if(state.inventory.item[index].qty < 1) {
          
          state.inventory.item[index].using = false;
          
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

    console.log(gearItem);

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
  activateItem: (state, action) => {
     
     state.inventory.item.map((item, index) => {
       state.inventory.item[index].using = false;
       return true;
     });
     state.activeItem = state.inventory.item[action.payload.item];
     state.inventory.item[action.payload.item].using = true;
  },
  deactivateItem: (state, action) => {
    state.inventory.item.map((item, index) => {
      
      state.inventory.item[index].using = false;
      return true;
    });
    state.activeItem = null;
    
  },
  setApplyItem: (state, action) => {
    state.applyingItem = action.payload.applying;
  },
  setWeaponToEquip: ( state, action ) => {

    state.gearToEquip = action.payload.weapon;

  },
  clearGearToEquip: ( state, action ) => {

    state.gearToEquip = false;

  },
  setArmorToEquip: ( state, action ) => {

    state.gearToEquip = action.payload.armor;

  },
  setEquippingCharacter: ( state, action ) => {

    state.equippingCharacter = action.payload.charId;

  }
  
}