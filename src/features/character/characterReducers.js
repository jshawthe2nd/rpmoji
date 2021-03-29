export default {
  attack: (state) => {},
  defend: (state) => {},
  equip: ( state, action ) => {

    const { charId, gearItem } = action.payload;

    state.chars.map( ( char, index ) => {

      if( char.id === charId ) {

        switch( gearItem.type ) {

          case `sword`:
          case `axe`:
          case `dagger`:
          case `bow`:


          break;

          case `armor`:
          case `robe`:

             

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

    state.chars.map((char, index) => {
      if (char.id === charId) {
        state.chars[index].status = false;
        return true;
      }

      return false;
    });
  },
  openSubMenu: (state) => {},
  recoverHP: (state, action) => {
    const { charId } = action.payload;

    //TODO: The below will be easier to do once the State shape changes to be
    //      a chars object keyed by character ID, that way we can be clearer
    //      about setting new values
    //

    state.chars.map((char, index) => {
      if (char.id === charId) {
        const healing = char.stats.hp.current + (char.stats.level.current * 10) / 2;
        state.chars[index].stats.hp.current = (healing > char.stats.hp.max) ? char.stats.hp.max : healing;
        return true;
      }
      return false;
    });
  },
  recoverMP: (state, action) => {
    const { charId } = action.payload;

    state.chars.map((char, index) => {
      if (char.id === charId) {

        const healing = char.stats.mp.current +
        Math.floor( ( char.stats.level.current * 5 ) / 2 );

        state.chars[index].stats.mp.current = ( healing > char.stats.mp.max ) ? char.stats.mp.max : healing;
          
        return true;
      }

      return false;
    });
  },
};
