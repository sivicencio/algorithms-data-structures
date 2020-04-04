import DArray from './data-structures/arrays/dynamic-array';

const exampleArray = new DArray(10);
exampleArray.add({
  name: 'my name',
  age: 31,
});

console.log(exampleArray.get(0));
