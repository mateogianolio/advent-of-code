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

  const types = [...new Set([...formula.split('').map(char => char.toLowerCase())])];
  const formulae = types
    .map(type => formula.split('').filter(char => char.toLowerCase() !== type).join(''))
    .map(recurse)
    .map(result => result.length);

  const answer = Math.min(...formulae);

  console.log(`Answer: ${answer}`);
})();
