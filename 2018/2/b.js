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
  let answer = '';

  for (const a of boxes) {
    let diff = 0;
    for (const b of boxes) {
      for (let i = 0; i < a.length; i++) {
        diff += a[i] !== b[i];
        if (diff > 1) {
          diff = 0;
          break;
        }
      }

      if (diff === 1) {
        for (let i = 0; i < a.length; i++) {
          answer += a[i] === b[i] ? a[i] : '';
        }
        break;
      }
    }

    if (answer) {
      break;
    }
  }

  console.log(`Answer: ${answer}`);
})();
