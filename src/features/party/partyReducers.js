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
     console.log(action);
     return state;
  }
};