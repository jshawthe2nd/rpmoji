
/**
 * This function is just a simple test of a scaling mechanism for increasing the amount of exp required to obtain the next level (level || currentLevel + 1)
 * 
 * For the first 9 levels, it is simply 50 * level || currentLevel
 * For every tenth + n levels, (eg, 10 -> 19, 20 -> 29, etc), I attempt rudimentary scaling.
 * An increment of 50xp is accumulated for every new set of 9 numbers, eg:
 * 10 -> 19: 50 * (n + 1) + currentLevel * 50 
 * 
 * Need to figure out:
 * Come up with formula that we could predictably apply the incremental 50xp every deca-interval
 * 
 * - if {parseInt(level % 10)}
 * 
 * @param {int} xp 
 * @param {int} level 
 */
function calculateXPToNextLevel(xp, currentLevel) {
  // console.log(currentLevel * 50);
  const n = Math.floor((currentLevel - 1 / 10));
  
  const xpToNext = n + 1 * 50 + (currentLevel * 50);
  
}

export const determineAmountToRecover = (charLevel, recoveryCost) => {
  return ((charLevel * 10 / 2 ) + (recoveryCost / 2));
}