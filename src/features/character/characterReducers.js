export default {
  attack: ( state ) => {},
  defend: ( state ) => {},
  equip: ( state, action ) => {

    const { id, gear } = action.payload;

    const char = { ...state.characters[ id ] };

    switch( gear.type ) {

      case `sword`:
      case `axe`:
      case `dagger`:
      case `bow`:

        //
        //  TODO: put current weapon into inventory
        //

        state.characters[ id ]
          .gear.weapon = { 
                  ...gear,
                  dmg: ( gear.dmg + char.stats.level.current ) 
                };

      break;

      case `armor`:
      case `robe`:

        state.characters[ id ]
          .gear.armor = { ...gear };

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
  levelUp: ( state ) => {},
  gainExp: ( state ) => {},
  afflictStatus: ( state ) => {},
  clearStatus: (state, action) => {

    const { charId } = action.payload;

    state.characters[ charId ].status = false;

  },

  openSubMenu: ( state ) => {},

  recoverHP: ( state, action ) => {

    const { charId } = action.payload;

    const char = { ...state.characters[ charId ] };

    const healing = state.activeSpell.heal;

    state.characters[ charId ].stats.hp.current = ( ( healing + char.stats.hp.current ) > char.stats.hp.max ) ? char.stats.hp.max : healing + char.stats.hp.current;

  },

  recoverMP: ( state, action ) => {
    
    const { charId } = action.payload;

    const char = { ...state.characters[ charId ] };

    const healing = char.stats.mp.current + Math.floor( ( char.stats.level.current * 5 ) / 2 );

    state.characters[ charId ].stats.mp.current = ( healing > char.stats.mp.max ) ? char.stats.mp.max : healing;

  },

  reduceHP: ( state, action ) => {

    const { charId } = action.payload;

    const char = { ...state.characters[ charId ] };

    const spell = state.activeSpell;

    state.characters[ charId ].stats.hp.current = ( ( char.stats.hp.current - spell.cost ) < 0 ) ? 0 : char.stats.hp.current - spell.cost;

  },

  reduceMP: ( state, action ) => {

    

    const { charId } = action.payload;

    //const char = { ...state.characters[ charId ] };

    const stats = { ...state.characters[ charId ].stats };

    const mp = stats.mp.current;

    console.log(stats);

    const spell = { ...state.activeSpell };

    console.log( ( ( mp.current - spell.cost ) < 0 ) ? 0 : mp.current - spell.cost );

    state.characters[ charId ].stats.mp.current = ( ( state.characters[ charId ].stats.mp.current - spell.cost ) < 0 ) ? 0 : state.characters[ charId ].stats.mp.current - spell.cost;

  }
  
};
