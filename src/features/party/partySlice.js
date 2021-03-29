import { createSlice } from '@reduxjs/toolkit';

import partyReducers from './partyReducers';
import characterReducers from '../character/characterReducers';

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
            current: 50,
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
          id:     '501',
          symbol: "item.potion",
          label:  "Potion",
          qty:    4,
          using: false
        },
        {
          id:     '502',
          symbol: "item.ether",
          label:  "Ether",
          qty:    2,
          using: false
        },
        {
          symbol: "item.antidote",
          label: "Antidote",
          qty: 2,
          using: false
        },
        {
          id:     '503',
          symbol: "item.elixir",
          label:  "Elixir",
          qty:    1,
          using: false
        },
      ],
      weapon: [
        {
          id:     '601',
          name:   'Stone',
          type:   'sword',
          symbol: 'item.weapon.sword',
          qty:    1
        },
        {
          id:     '602',
          name:   'Stone',
          type:   'axe',
          symbol: 'item.weapon.axe',
          qty:    1
        },
        {
          id:     '603',
          name:   'Branch',
          type:   'bow',
          symbol: 'item.weapon.bow',
          qty:    1
        },
        {
          id:     '604',
          name:   'Stone',
          type:   'dagger',
          symbol: 'item.weapon.dagger',
          qty:    1
        }
      ],
      armor: [
        {
          id:     '701',
          name:   'Leather',
          type:   'armor',
          qty:    1
        },
        {
          id:     '703',
          name:   'Burlap',
          type:   'robe',
          qty:    1
        },
      ],
      scroll: [
        {
          id:   '801',
          name: 'Cure',
          qty:   1
        }
      ]
    },
    gold: 666,
    activeItem: null,
    applyingItem: false,
    weaponToEquip: false,
    armorToEquip: false
  },
  reducers: {
    ...partyReducers,
    ...characterReducers
  }
});

export const { 
  incrementItemQty, 
  decrementItemQty, 
  removeFromInventory, 
  addToInventory, 
  activateItem,
  deactivateItem,
  setApplyItem,
  recoverHP,
  recoverMP,
  clearStatus
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

export const selectAllWeapons = ( state ) => {

  return state.party.inventory.weapon;

}

export const selectWeaponToEquip = ( state ) => {

  return state.party.weaponToEquip;

}

export const selectArmor = (state, action) => {
  console.log(action);
}

export const selectAllArmor = ( state ) => {

  return state.party.inventory.armor;

}

export const selectItems = state => {
  return state.party.inventory.item;
};

export const selectActiveItem = state => { 
  
  return state.party.activeItem;
}

export const selectActiveItemQty = state => {
  return (state.party.activeItem) ? state.party.activeItem.qty : null;
}

export const selectApplyingItem = state => {
  return state.party.applyingItem;
}

export default slice.reducer;