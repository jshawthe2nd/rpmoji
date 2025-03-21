import React from 'react';

import styles from './World.module.css';

export function World({ children }) {
    return (
        <div className={ styles.camera }>
            {children}
        </div>
    )

}