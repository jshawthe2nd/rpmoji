export default {
  incrementItemQty: (state, action) => {
    console.log(action);
  },
  decrementItemQty: (state, action) => {
    console.log(action);
    const { itemUsed } = action.payload;
    state.inventory.item.map((item, index) => {
      if(item.label === itemUsed.label) {
        state.inventory.item[index].qty = (state.inventory.item[index].qty - 1 < 0) ? 0 : state.inventory.item[index].qty - 1;
      }
    });
  },
  removeFromInventory: (state, action) => {
    console.log(action);
  },
  addToInventory: (state, action) => {
    
  },
  activateItem: (state, action) => {
     
     state.activeItem = state.inventory.item[action.payload.item];
  },
  setApplyItem: (state, action) => {
    state.applyingItem = action.payload.applying;
  }
}