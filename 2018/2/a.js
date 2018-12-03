const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

(async () => {
  const data = await read('./input', 'utf8');
  const boxes = data
    .split('\n')
    .filter(value => value);
  
  let triples = 0;
  let doubles = 0;

  for (const id of boxes) {
    const map = {};
    for (const char of id) {
      map[char] = map[char] === undefined ? 1 : map[char] + 1;
    }

    triples += !!Object.values(map).find(value => value === 3);
    doubles += !!Object.values(map).find(value => value === 2);
  }

  console.log(`Answer: ${triples * doubles}`);
})();
