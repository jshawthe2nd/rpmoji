export default {
  attack: (state) => {},
  defend: (state) => {},
  equip: ( state, action ) => {

    const { charId, gearToEquip } = action.payload;

    const char = { ...state.characters[ charId ] };

    switch( gearToEquip.type ) {

      case `sword`:
      case `axe`:
      case `dagger`:
      case `bow`:

        //
        //  TODO: put current weapon into inventory
        //

        state.characters[ charId ].gear.weapon = { 
                                ...gearToEquip,
                                dmg: ( gearToEquip.dmg + char.level ) 
                              };

      break;

      case `armor`:
      case `robe`:

        state.characters[ charId ].gear.armor = { ...gearToEquip };

      break;

      case `scroll`:
        //
        //  So maybe the scroll, as part of its data, should explain what
        //  spell it will give to the user, 

      break;

      default:

      break;

    }

  },
  levelUp: (state) => {},
  gainExp: (state) => {},
  afflictStatus: (state) => {},
  clearStatus: (state, action) => {

    const { charId } = action.payload;

    state.characters[ charId ].status = false;

  },

  openSubMenu: (state) => {},

  recoverHP: (state, action) => {

    const { charId } = action.payload;

    const char = { ...state.characters[ charId ] };

    const healing = char.stats.hp.current + Math.floor( ( char.stats.level.current * 10 ) / 2 );

    state.characters[ charId ].stats.hp.current = ( healing > char.stats.hp.max ) ? char.stats.hp.max : healing;

  },

  recoverMP: (state, action) => {
    
    const { charId } = action.payload;

    const char = { ...state.characters[ charId ] };

    const healing = char.stats.mp.current + Math.floor( ( char.stats.level.current * 5 ) / 2 );

    state.characters[ charId ].stats.mp.current = ( healing > char.stats.mp.max ) ? char.stats.mp.max : healing;

  },
};
