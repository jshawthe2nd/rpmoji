import { createSlice } from '@reduxjs/toolkit';

import partyReducers from './partyReducers';
import characterReducers from '../character/characterReducers';

export const slice = createSlice({
  name: 'party',
  initialState: {
    characters: {
      123: {
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
            id:     605,
            type:   "sword",
            dmg:    10,
            label:  "Wood",
            symbol: "gear.weapon.sword"
          },
          armor: {
            id:     704,
            label:  "Leather",
            def:    5,
            symbol: "gear.armor",
            type:   "armor"
          }
        },
        status: "poison"
      },
      124: {
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
            id:     606,
            type:   "sword",
            dmg:    10,
            label:  "Wood",
            symbol: "gear.weapon.sword"
          },
          armor: {
            id:     705,
            label:  "Leather",
            def:    5,
            symbol: "gear.armor",
            type:   "armor"
          }
        },
        status: "poison"
      },
      125: {
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
            id:     607,
            type:   "dagger",
            dmg:    4,
            label:  "Wood",
            symbol: "gear.weapon.dagger"
          },
          armor: {
            id:     706,
            label: "Burlap",
            def: 2,
            symbol: "gear.robe",
            type:   "robe"
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
      126: {
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
            id:     608,
            type:   "dagger",
            dmg:    4,
            label:  "Wood",
            symbol: "gear.weapon.dagger"
          },
          armor: {
            id:     707,
            label:  "Burlap",
            def:    2,
            symbol: "gear.robe",
            type:   "robe"
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
    },
    inventory: {
      item: [
        {
          id:     501,
          symbol: "item.potion",
          label:  "Potion",
          qty:    4,
          using: false
        },
        {
          id:     502,
          symbol: "item.ether",
          label:  "Ether",
          qty:    2,
          using: false
        },
        {
          id:     503,
          symbol: "item.antidote",
          label:  "Antidote",
          qty:    2,
          using:  false
        },
        {
          id:     504,
          symbol: "item.elixir",
          label:  "Elixir",
          qty:    1,
          using: false
        },
      ],
      weapon: [
        {
          id:     601,
          label:  'Stone',
          type:   'sword',
          symbol: 'gear.weapon.sword',
          dmg:    5,
          crit:   0.25,
          cdmg:   0.5,
          qty:    1
        },
        {
          id:     602,
          label:  'Stone',
          type:   'axe',
          symbol: 'gear.weapon.axe',
          dmg:    5,
          qty:    1
        },
        {
          id:     603,
          label:  'Branch',
          type:   'bow',
          symbol: 'gear.weapon.bow',
          dmg:    4,
          qty:    1
        },
        {
          id:     604,
          label:  'Stone',
          type:   'dagger',
          symbol: 'gear.weapon.dagger',
          dmg:    4,
          qty:    1
        }
      ],
      armor: [
        {
          id:     701,
          label:  'Leather',
          type:   'armor',
          symbol: 'gear.armor',
          qty:    1
        },
        {
          id:     703,
          label:  'Hide',
          type:   'robe',
          symbol: 'gear.robe',
          qty:    1
        },
      ],
      scroll: [
        {
          id:     801,
          name:   'Cure',
          symbol: 'magic.scroll',
          qty:    1
        }
      ]
    },
    gold: 666,
    activeItem: null,
    applyingItem: false,
    gearToEquip: null,
    equippingCharacter: null,
    selectedItem: null
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
  clearStatus,
  setWeaponToEquip,
  setArmorToEquip,
  clearGearToEquip,
  sendGearToInventory,
  setEquippingCharacter,
  selectCharacter,
  equip,
  learnSpell
} = slice.actions;

export const selectInventory = ( state ) => state.party.inventory;

export const selectChars = ( state ) => {
  return state.party.characters;
}

export const selectCharacterIds = ( state ) => {

  return [ ...Object.keys( state.party.characters ) ];

}


export const selectGold = ( state ) => state.gold;

export const selectItem = ( state, action ) => {
  console.log(action);
}

export const selectWeapon = ( state, action ) => {
  console.log(action);
}

export const selectAllWeapons = ( state ) => {

  return state.party.inventory.weapon;

}

export const selectArmor = ( state, action ) => {
  console.log(action);
}

export const selectAllArmor = ( state ) => {

  return state.party.inventory.armor;

}

export const selectGearToEquip = ( state ) => {

  return state.party.gearToEquip;

}

export const selectItems = ( state ) => {
  return state.party.inventory.item;
};

export const selectActiveItem = ( state ) => { 
  
  return state.party.activeItem;
}

export const selectActiveItemQty = ( state ) => {
  return (state.party.activeItem) ? state.party.activeItem.qty : null;
}

export const selectApplyingItem = ( state ) => {
  return state.party.applyingItem;
}

export const selectEquippingCharacter = ( state ) => {
  return state.party.equippingCharacter;
}

export default slice.reducer;