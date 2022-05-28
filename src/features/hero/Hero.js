import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '../../icons/Icon';

import {
    selectPartyHero
} from '../party/partySlice';

import {
    getCharacterSymbolPath,
    getCharacterIconLabel
} from '../character/characterUtils';

//TODO: Use redux to get the first Character in the party and use
//      icon to put in this div
//

export function Hero( props ) {

    const { x, y } = props;

    console.log(x,y);


    const partyHero = useSelector( selectPartyHero );

    return (
        <div className='hero' style={{
            width: '32px',
            height: '32px',
            fontSize: '24px',
            display: 'inline',
            position: 'absolute',
            zIndex: 5,
            transform: `translate3d( ${x}px, ${y}px, 0)`
        }}>

            <Icon
                symbol={ getCharacterSymbolPath( partyHero ) }
                label={ getCharacterIconLabel( partyHero ) } />

        </div>
    );
}