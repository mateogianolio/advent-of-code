const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

(async () => {
  const data = await read('./input', 'utf8');
  const shifts = data
    .split('\n')
    .filter(value => value)
    .map(Number);
  
  let freq = 0;
  const seen = { [freq]: true };

  for(let i = 0;;i++) {
    freq += shifts[i % shifts.length];
    if (seen[freq]) {
      break;
    }

    seen[freq] = true;
  }

  console.log(`Answer: ${freq}`);
})();
