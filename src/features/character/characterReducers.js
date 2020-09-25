export default {
  attack: (state) => {},
  defend: (state) => {},
  equip: (state) => {},
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
        state.chars[index].stats.mp.current =
          char.stats.mp.current +
          Math.floor((char.stats.level.current * 5) / 2);
        return true;
      }

      return false;
    });
  },
};
