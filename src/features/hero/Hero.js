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

    const partyHero = useSelector( selectPartyHero );

    return (
        <div className='hero' style={{
            width: '64px',
            height: '64px',
            fontSize: '32px',
            display: 'inline',
            position: 'absolute',
            zIndex: 5,
            transform: `translate3d( ${x}px, ${y}px, 0)`
        }}>
            <span style={{
                backgroundColor: 'rgba(50,50,50,0.8)',
                display: 'block',
                width: '47px',
                height: '8px',
                position: 'absolute',
                top: '36px',
                left: '-3px',
                borderRadius: '50%',
                transform: 'skew',
                boxShadow: '0 0 5px rgba(50,50,50,0.8)',
                zIndex: 1
            }}/>
            <Icon
                symbol={ getCharacterSymbolPath( partyHero ) }
                label={ getCharacterIconLabel( partyHero ) } />
            

        </div>
    );
}