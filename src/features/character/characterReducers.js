export default {
  attack: (state) => {},
  defend: (state) => {},
  equip: ( state, action ) => {

    const { charId, gearItem } = action.payload;

    state.chars.map( ( char, index ) => {

      if( char.id === charId ) {

        //

        switch( gearItem.type ) {

          case `sword`:
          case `axe`:
          case `dagger`:
          case `bow`:

            state.chars[index].gear.weapon = { ...gearItem };

          break;

          case `armor`:
          case `robe`:

            state.chars[index].gear.armor = { ...gearItem };

          break;

          case `scroll`:

          break;

          default:

          break;

        }

      }

      return true;

    } )

  },
  setWeaponToEquip: ( state, action ) => {

    

  },
  levelUp: (state) => {},
  gainExp: (state) => {},
  afflictStatus: (state) => {},
  clearStatus: (state, action) => {

    const { charId } = action.payload;

    state.chars2[ charId ].status = false;

  },

  openSubMenu: (state) => {},

  recoverHP: (state, action) => {

    const { charId } = action.payload;

    const char = { ...state.chars2[ charId ] };

    const healing = char.stats.hp.current + Math.floor( ( char.stats.level.current * 10 ) / 2 );

    state.chars2[ charId ].stats.hp.current = ( healing > char.stats.hp.max ) ? char.stats.hp.max : healing;

  },

  recoverMP: (state, action) => {
    
    const { charId } = action.payload;

    const char = { ...state.chars2[ charId ] };

    const healing = char.stats.mp.current + Math.floor( ( char.stats.level.current * 5 ) / 2 );

    state.chars2[ charId ].stats.mp.current = ( healing > char.stats.mp.max ) ? char.stats.mp.max : healing;

  },
};
