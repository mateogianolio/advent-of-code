const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

const parse = (claim) => {
  const [id, loc, dim] = claim
    .split(/@ |: /g);

  const [x, y] = loc.split(',');
  const [width, height] = dim.split('x');
  
  return {
    id: Number(id.replace('#', '').trim()),
    x: Number(x),
    y: Number(y),
    width: Number(width),
    height: Number(height),
    intersections: 0,
  };
}

(async () => {
  const data = await read('./input', 'utf8');
  const claims = data
    .split('\n')
    .filter(value => value)
    .map(parse);
  
  const size = 1000;
  const board = new Int32Array(size * size).fill(-1);

  claims
    .forEach((claim, i) => {
      for (let c = claim.x; c < claim.x + claim.width; c++) {
        for (let r = claim.y; r < claim.y + claim.height; r++) {
          const pos = size * r + c;
          if (board[pos] >= 0) {
            claims[board[pos]].intersections++;
            claim.intersections++;
          }

          board[pos] = i;
        }
      }
    });

  const answer = claims.find(claim => claim.intersections === 0).id;

  console.log(`Answer: ${answer}`);
})();
