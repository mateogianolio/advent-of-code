const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

(async () => {
  const data = await read('./input', 'utf8');
  const freq = data
    .split('\n')
    .filter(value => value)
    .map(Number)
    .reduce((sum, value) => sum += value, 0);

  console.log(`Answer: ${freq}`);
})();
