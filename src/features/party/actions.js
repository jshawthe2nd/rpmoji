export const checkItem = ( itemUsed, deactivateItem ) => {
    
  return( dispatch, getState ) => {        

    const items = getState().party.inventory.item;        

    const item  = items.find( item => item.id == itemUsed.id );        

    if( item.qty < 1 ) {

      dispatch( deactivateItem( {} ) );

    }

  };

}