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
  removeFromInventory: (state, action) => {
    console.log(action);
  },
  addToInventory: (state, action) => {
    
  },
  activateItem: (state, action) => {
     console.log(state);
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
  
}