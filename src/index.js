/* eslint-disable no-console */

import DArray from './data-structures/arrays/dynamic-array';

const exampleArray = new DArray();
exampleArray.add({
  name: 'my name',
  age: 31,
});

exampleArray.add({
  name: 'my name',
  age: 12,
});

exampleArray.add({
  name: 'last_name',
  age: 1,
});

exampleArray.add({
  name: 'name',
  age: 30,
});

exampleArray.add({
  name: 'my',
  age: 23,
});

console.log('Length:', exampleArray.length);
const elem = exampleArray.get(2);
console.log('One element:', elem);
console.log('Full array:', exampleArray);
console.log('-------------------');
const removedElem = exampleArray.remove(elem);
console.log('Array after removing element:', exampleArray);
console.log('Length after removing element:', exampleArray.length);
console.log('Removed element:', removedElem);
const otherElem = exampleArray.get(0);
console.log('Index of elem at position 0:', exampleArray.indexOf(otherElem));
console.log('Array contains elem at position 0:', exampleArray.contains(otherElem));
