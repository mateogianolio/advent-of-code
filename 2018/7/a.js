const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

const parse = (instruction) => ({
  prev: instruction[36],
  next: instruction[5],
});

(async () => {
  const data = await read('./input', 'utf8');
  const instructions = data
    .split('\n')
    .filter(value => value)
    .map(parse);

  const recurse = ([node, ...nodes]) => {
    const found = nodes.filter(({ next }) => next === node.prev);
    if (found.length) {
      return recurse(found);
    } else {
      return nodes;
    }
  }

  console.log(recurse(instructions));
})();
