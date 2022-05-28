import React, { useState, useEffect } from 'react';

import { Hero } from '../hero/Hero';

import styles from './Map.module.css';

import { directions, keys } from '../../utils/meta';

export function Map(props) {

    const { x, y, children } = props;

    const css = {
        imageRendering: 'pixelated',
        backgroundImage: 'url("https://assets.codepen.io/21542/CameraDemoMap.png")',
        backgroundSize: '150%',
        width: 'calc(13 * var(--grid-cell))',
        height: 'calc(10 * var(--grid-cell))',
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