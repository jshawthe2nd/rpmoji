export default {

    pauseGame: ( state ) => {

        state.paused = !state.paused;

        console.log(state.paused);

    }

}