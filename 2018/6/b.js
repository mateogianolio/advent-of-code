const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

const norm = ([p1, p2] = [0, 0], [q1, q2] = [0, 0]) => Math.abs(p1 - q1) + Math.abs(p2 - q2);

(async () => {
  const data = await read('./input', 'utf8');
  const coords = data
    .split('\n')
    .filter(value => value)
    .map(coords => ([x, y] = coords.split(', ').map(Number)));

  const width = Math.max(...coords.map(([x]) => x));
  const height = Math.max(...coords.map(([x, y]) => y));
  const grid = new Int32Array(width * height).fill(-1);

  for (let c = 0; c < width; c++) {
    for (let r = 0; r < height; r++) {
      // find sum of distance to all coords
      grid[width * r + c] = coords
        .map(coord => norm([c, r], coord))
        .reduce((acc, value) => acc + value, 0)
        < 10000;
    }
  }

  const answer = grid
    .filter(tile => tile > 0)
    .length;

  console.log(`Answer: ${answer}`);
})();
