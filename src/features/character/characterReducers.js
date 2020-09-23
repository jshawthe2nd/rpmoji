export default {
  attack: state => { },
  defend: state => { },
  equip: state => { },
  applyItem: (state, action) => {
    console.log(state, action);
  },
  levelUp: state => { },
  gainExp: state => { },
  afflictStatus: state => { },
  clearStatus: (state, action) => { 

  },
  openSubMenu: state => { },
  recoverHP: (state, action) => {
    console.log(state, action);
  },
  recoverMP: (state, action) => {

  }
}