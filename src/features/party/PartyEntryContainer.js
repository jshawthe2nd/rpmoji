import React from 'react';
import { CSSTransition } from "react-transition-group";
import styles from "./Party.module.css";

export function PartyEntryContainer({ children, ...props }) {

    const nodeRef = React.useRef(null);

    return (
        <CSSTransition
            nodeRef={nodeRef}
            timeout={500}
            classNames="party"
            {...props}
        >
            <div ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    );

}