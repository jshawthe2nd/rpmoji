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

  
  
  if(!item) return false;

  switch(item.label) {
    case `Potion`:
      
      return char.stats.hp.current < char.stats.hp.max;
    case `Ether`:
      return char.stats.mp.current < char.stats.mp.max;
    case `Antidote`:
      return char.status === 'poison';
    case `Elixir`:
      return char.stats.status === 'ko';
    default:
      return false;
  }
}

export const isStatAtMax = ( stat, char ) => {

  return char.stats[ stat ].current === char.stats[ stat ].max;

}

export const heal = ( stat, char ) => {

  switch( stat ) {

    case 'hp':

      return Math.floor( ( char.stats.level.current * 10 ) / 2 );

    case 'mp':

      return Math.floor( ( char.stats.level.current * 5 ) / 2 );

    default:

      throw new Error();

  }  

};

export const charReducer = ( state, action ) => { 

  let recovered;

  switch( action.type ) {

    case 'recoverHP':

      recovered = heal( `hp`, state );

      return {

        ...state,

        stats: {

          hp: state.stats.hp.current + recovered,
          ...state.stats

        }

      };

    case 'recoverMP':

      recovered = heal( `mp`, state );

      return {

        ...state,

        stats: {

          mp: state.stats.mp.current + recovered,
          ...state.stats

        }
        
      };

    case 'clearStatus':

      return heal( `status`, state );

    default:

      throw new Error();

  }

}