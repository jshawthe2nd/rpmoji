import React, { useState, useEffect } from 'react';

import { Hero } from '../hero/Hero';

import styles from './Map.module.css';

import { directions, keys } from '../../utils/meta';

export function Map(props) {

    const { x, y, children } = props;

    const css = {
        imageRendering: 'pixelated',
        backgroundImage: 'url("https://assets.codepen.io/21542/CameraDemoMap.png")',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        width: '720px',
        height: '560px',
        position: 'relative',
        zIndex: 1,
        transform: `translate3d( ${x}px, ${y}px, 0)`
    };

    let pos;

    return (
        <div style={ css }>
            { children }
        </div>
    )

}