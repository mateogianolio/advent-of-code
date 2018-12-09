const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

(async () => {
  const data = await read('./input', 'utf8');
  const formula = data
    .replace('\n', '');
  
  const recurse = (input) => {
    let result = '';
    let reductions = 0;
    let c = false;

    for (let i = 0; i < input.length; i++) {
      if (c) {
        c = false;
        continue;
      }

      if (input[i + 1] && input[i] !== input[i + 1] && input[i].toLowerCase() === input[i + 1].toLowerCase()) {
        reductions++;
        c = true;
        continue;
      }
  
      result += input[i];
    }

    return reductions ? recurse(result) : result;
  }

  const answer = recurse(formula).length;

  console.log(`Answer: ${answer}`);
})();
