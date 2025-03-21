import { useEffect } from "react";

export const useKeyPress = ( keys, action ) => {

    useEffect(() => {

        function onKeyDown(e) {

            if( keys.includes( e.key ) ) action(e);

        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);

    });

    useEffect(() => {

        function onKeyUp(e) {

            if( keys.includes( e.key ) ) action(e);

        }

        window.addEventListener('keyup', onKeyUp);
        return () => window.removeEventListener('keyup', onKeyUp);

    });


}