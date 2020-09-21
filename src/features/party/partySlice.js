import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'party',
  initialState: {
    chars: [
      {
        id: 123,
        name: "Dirk",
        charType: 1,
        gender: 1,
        stats: {
          hp: {
            current: 45,
            max: 50
          },
          mp: {
            current: 0,
            max: 0
          },
          level: {
            current: 1,
            exp: 5,
            next: 50,
          },
        },
        gear: {
          weapon: {
            type: "sword",
            dmg: 10,
            name: "Wood"
          },
          armor: {
            name: "Leather",
            def: 5
          }
        },
        status: "poison"
      },
      {
        id: 124,
        name: "Lara",
        charType: 1,
        gender: 2,
        stats: {
          hp: {
            current: 42,
            max: 50
          },
          mp: {
            current: 0,
            max: 0
          },
          level: {
            current: 1,
            exp: 5,
            next: 50,
          },
        },
        gear: {
          weapon: {
            type: "sword",
            dmg: 10,
            name: "Wood"
          },
          armor: {
            name: "Leather",
            def: 5
          }
        },
        status: "poison"
      },
      {
        id: 125,
        name: "Zyzx",
        charType: 2,
        gender: 1,
        stats: {
          hp: {
            current: 50,
            max: 50
          },
          mp: {
            current: 30,
            max: 35
          },
          level: {
            current: 1,
            exp: 5,
            next: 50,
          },
        },
        gear: {
          weapon: {
            type: "dagger",
            dmg: 4,
            name: "Wood"
          },
          armor: {
            name: "Burlap",
            def: 2
          },
          spells: [
            {
              type: 'ice',
              cost: 4,
              dmg: 8              
            },
            {
              type: 'cure',
              cost: 6,
              // possible formula for calculating heal:
              // (level * 10 / 2) + (cost / 2) 
              heal: ((1 * 10 /2 ) + (6 / 2)) + (Math.floor(Math.random() * Math.floor((1 * 10 / 2))))
            }
          ]
        },
        status: false
      },
      {
        id: 126,
        name: "Zyra",
        charType: 2,
        gender: 2,
        stats: {
          hp: {
            current: 50,
            max: 50
          },
          mp: {
            current: 35,
            max: 35
          },
          level: {
            current: 1,
            exp: 5,
            next: 50,
          },
        },
        gear: {
          weapon: {
            type: "dagger",
            dmg: 4,
            name: "Wood"
          },
          armor: {
            name: "Burlap",
            def: 2
          },
          spells: [
            {
              type: 'ice',
              cost: 4,
              dmg: 8              
            },
            {
              type: 'cure',
              cost: 6,
              // possible formula for calculating heal:
              // (level * 10 / 2) + (cost / 2) 
              heal: ((1 * 10 /2 ) + (6 / 2)) + (Math.floor(Math.random() * Math.floor((1 * 10 / 2))))
            }
          ]
        },
        status: false
      }
    ],
    inventory: {
      item: [
        {
          symbol: "item.potion",
          label: "Potion",
          qty: 4,
        },
        {
          symbol: "item.antidote",
          label: "Antidote",
          qty: 2,
        },
        {
          symbol: "item.elixir",
          label: "Elixir",
          qty: 1,
        },
      ],
      weapon: [
        {
          name: 'Stone',
          type: 'sword',
          qty: 1
        },
        {
          name: 'Stone',
          type: 'axe',
          qty: 1
        },
        {
          name: 'Branch',
          type: 'bow',
          qty: 1
        },
        {
          name: 'Stone',
          type: 'dagger',
          qty: 1
        }
      ],
      armor: [
        {
          name: 'Leather',
          type: 'armor',
          qty: 1
        },
        {
          name: 'Burlap',
          type: 'robe',
          qty: 1
        },
      ],
      scroll: [
        {
          name: 'Cure',
          qty: 1
        }
      ]
    },
    gold: 666,
    activeItem: null
  },
  reducers: {
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
    }
  }
});

export const { 
  incrementItemQty, 
  decrementItemQty, 
  removeFromInventory, 
  addToInventory, 
  activateItem,
} = slice.actions;


export const selectInventory = state => state.party.inventory;

export const selectChars = state => {
  return state.party.chars;
}

export const selectGold = state => state.gold;

export const selectItem = (state, action) => {
  console.log(action);
}

export const selectWeapon = (state, action) => {
  console.log(action);
}

export const selectArmor = (state, action) => {
  console.log(action);
}

export const selectItems = state => {
  return state.party.inventory.item;
};

export const selectActiveItem = state => { 
  return state.party.activeItem;
}

export default slice.reducer;