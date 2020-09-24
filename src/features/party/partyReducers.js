export default {
  incrementItemQty: (state, action) => {
    console.log(action);
  },
  decrementItemQty: (state, action) => {
    console.log(action);
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