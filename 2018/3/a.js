const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

const parse = (claim) => {
  const [loc, dim] = claim
    .split(/@ |: /g)
    .slice(1);
  
  const [x, y] = loc.split(',');
  const [width, height] = dim.split('x');
  
  return {
    x: Number(x),
    y: Number(y),
    width: Number(width),
    height: Number(height),
  };
}

(async () => {
  const data = await read('./input', 'utf8');
  const claims = data
    .split('\n')
    .filter(value => value);
  
  const size = 1000;
  const board = new Int32Array(size * size).fill(0);

  for (let i = 0; i < claims.length; i++) {
    const claim = claims[i];

    const {
      x,
      y,
      width,
      height,
    } = parse(claim);

    for (let c = x; c < x + width; c++) {
      for (let r = y; r < y + height; r++) {
        board[size * r + c]++;
      }
    }
  }

  const intersections = board
    .filter(value => value >= 2)
    .length;

  console.log(`Answer: ${intersections}`);
})();
