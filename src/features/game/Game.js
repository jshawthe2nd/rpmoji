import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Animated } from 'react-animated-css';

import { World } from '../world/World';
import { Map } from '../map/Map';
import { Hero } from '../hero/Hero';
import { Party } from "../party/Party";
import { Menu } from "../menu/Menu";

import { isGamePaused, pauseGame } from "./gameSlice";

import { useKeyPress } from "../../utils/hooks";
import { directions, keys } from '../../utils/meta';

import styles from "./Game.module.css";


export function Game({ children }) {

  const dispatch = useDispatch();

  const animRef = React.useRef();

  const [ heldDirections, setHeldDirections ] = useState([]);

  const [ heroCoords, setHeroCoords ] = useState({ x: 340, y: 250 });

  const [ camCoords, setCamCoords ] = useState({ x: 0, y: 0 });

  const gamePaused = useSelector( isGamePaused );

  const speed = 1.75;

  useKeyPress(['w','a','s','d','Enter','q'], (e) => {

    if (e.repeat) return false;

    let dir;

    switch( e.type ) {

      case 'keydown':

          console.log(e);

          dir = keys[ e.key ];
          if( dir && heldDirections.indexOf(dir) === -1 ) {

            heldDirections.unshift( dir );

            setHeldDirections(heldDirections);

          }

          placeHero();   

      break;

      case 'keyup':

        if( e.key == 'Enter' ) {

          dispatch( pauseGame() );
          
          console.log(gamePaused);

        } else if( e.key == 'q' ) {
          
          if( gamePaused ) dispatch( pauseGame() );

        } else {

          dir = keys[ e.key ];

          const index = heldDirections.indexOf(dir);

          if( index > -1 ) {

            heldDirections.splice(index, 1);

            setHeldDirections(heldDirections);

          }

        }

      break;

    }

  });

  const placeHero = useCallback(() => {

    const heldDirection = heldDirections[0];

    if( heldDirection ) {

        if( heldDirection === directions.right ) heroCoords.x += speed;
        if( heldDirection === directions.left ) heroCoords.x -= speed;
        if( heldDirection === directions.down ) heroCoords.y += speed;
        if( heldDirection === directions.up ) heroCoords.y -= speed;

        
        console.log(heldDirections);

        setHeroCoords( (heroCoords) => {
          return { x: heroCoords.x, y: heroCoords.y };
        });

        setCamCoords( (camCoords) => {
          return { x: -heroCoords.x+340, y: -heroCoords.y+250 }
        });

    }

  }, [heldDirections, heroCoords]);

  useEffect(() => {

    animRef.current = requestAnimationFrame(placeHero);

  }, [placeHero]);

  return (
    <div id="gameContainer" className={styles.gameContainer}>
      <>
        { !gamePaused && <World>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDuration={200}
            animationOutDuration={200}
            isVisible={!gamePaused}
          >
          <Map x={camCoords.x} y={camCoords.y}>

            <Hero x={heroCoords.x} y={heroCoords.y} 
              isWalking={heldDirections[0]} 
            />

          </Map>
          </Animated>
        </World> }
        { gamePaused && <Animated 
          animationIn="slideInRight" 
          animationOut="slideOutRight" 
          isVisible={gamePaused}
          animationInDuration={200}
          animationOutDuration={200}
          animateOnMount={true}
          style={{ width: '100%', display: 'flex' }}
        >
          <Party/>
          <Menu/>
        </Animated>
        }
        {/* { gamePaused && <Party/> }
        { gamePaused &&  } */}
      </>
    </div>
  );
}
