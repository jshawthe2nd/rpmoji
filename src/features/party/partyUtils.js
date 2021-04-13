export const getTypeOfItem = ( item ) => {

    return item.symbol.substr( 0, item.symbol.indexOf( `.` ) );

}