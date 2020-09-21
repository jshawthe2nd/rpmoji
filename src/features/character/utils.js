export const getCharacterSymbolPath = (char) => {
  let symbolPath = ``;
  switch(char.charType) {
    case 1:
      symbolPath = `${symbolPath + `warrior`}`;
      break;
    case 2:
      symbolPath = `${symbolPath + `mage`}`;
      break;
    default:
      break;
  }

  switch(char.gender) {
    case 1:
      symbolPath = `${symbolPath + `.male`}`;
      break;
    case 2:
      symbolPath = `${symbolPath + `.female`}`;
      break;
    default:
      break;
  }
  
  return symbolPath;
}

export const getCharacterIconLabel = (char) => {
  let iconLabel = ``;
  switch(char.charType) {
    case 1:
      iconLabel = `${iconLabel + `warrior`}`;
      break;
    case 2:
      iconLabel = `${iconLabel + `mage`}`;
      break;
    default:
      break;
  }

  switch(char.gender) {
    case 1:
      iconLabel = `${iconLabel + ` male`}`;
      break;
    case 2:
      iconLabel = `${iconLabel + ` female`}`;
      break;
    default:
      break;
  }
  
  return iconLabel;
}

export const canItemBeUsed = (char, item) => {
  switch(item.label) {
    case `Potion`:
      return char.stats.hp.current < char.stats.hp.max;
    break;
    case `Antidote`:
      return char.stats.status === 'poison';
    break;
    case `Elixir`:
      return char.stats.status === 'ko';
    break;
  }
}