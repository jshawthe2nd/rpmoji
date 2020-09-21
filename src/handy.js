/**
 * The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
 */

const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]


/**
 * The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
 */

const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15


/**
 * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
 */

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]

/**
 * HOISTING
 * Hoisting puts variable and function declarations into memory during compile phase.
 * Only declarations, not initializations are hoisted
 * 
 */

 var num; // declaration
 num = 6; // initialization

 /**
  * CLOSURE
  * A closure is the combination of a function bundled together with references to its surrounding state, eg, the lexical environment. 
  * Closure gives access to an outer function's scope from an inner function. 
  * Closures created when a function is created, at creation time. 
  */

  function makeFunc() {
    var name = 'John';
    function displayName() {
      alert(name);
    }

    return displayName;
  }

  var myFunc = makeFunc();
  myFunc();