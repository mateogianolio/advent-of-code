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
      // find index of closest anchor
      grid[width * r + c] = coords.findIndex(coord => {
        const lhs = norm([c, r], coord);
        const norms = coords.map(coord => norm([c, r], coord));
        const rhs = Math.min(...norms);

        if (norms.filter(norm => norm === rhs).length > 1) {
          return false;
        }
        
        return lhs === rhs;
      });
    }
  }

  const blacklist = [];
  
  grid.forEach((tile, i) => {
    const r = Math.floor(i / width);
    const c = i % width;

    if (r === 0 || c === 0 || (r === 0 && c === width) || (c === 0 && r === height)) {
      if (!blacklist.includes(tile)) blacklist.push(tile);
    };
  });

  const res = grid
    .filter(tile => tile !== -1)
    .reduce((acc, tile) => ({
      ...acc,
      [tile]: blacklist.includes(tile) ? 0 : (acc[tile] || 0) + 1,
    }), {});

  let max = 0;

  for (key of Object.keys(res)) {
    if (max < res[key]) {
      max = res[key]
    }
  }

  console.log(`Answer: ${max}`);
})();
