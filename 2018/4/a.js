const { promisify } = require('util');
const { readFile } = require('fs');

const read = promisify(readFile);

const parse = (claim) => {
  const [date, time, ...rhs] = claim
    .replace(/[\[\]]/g, '')
    .split(' ');
  
  return {
    datetime: `${date} ${time}`,
    value: rhs,
  };
}

const sort = (a, b) => {
  if (a.datetime > b.datetime) return 1;
  if (a.datetime < b.datetime) return -1;
  return 0;
};

(async () => {
  const data = await read('./input', 'utf8');
  let carry;
  const shifts = data
    .split('\n')
    .filter(value => value)
    .map(parse)
    .sort(sort)
    .reduce((acc, event) => {
      if (event.value.length === 4) {
        const id = event.value[1];
        carry = id;
        return {
          ...acc,
          [id]: acc[id] ? acc[id] : [],
        };
      }

      const [date, time] = event.datetime.split(' ');
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');

      return {
        ...acc,
        [carry]: [
          ...acc[carry],
          {
            month: Number(month),
            day: Number(day),
            minute: Number(minute),
            value: event.value.join(' '),
          },
        ],
      };
    }, {});

  for (const id of Object.keys(shifts)) {
    const shift = shifts[id];
    const ranges = [];
    for (let i = 0; i < shift.length; i += 2) {
      ranges.push({
        start: shift[i].minute,
        end: shift[i + 1].minute - 1,
      });
    }

    shifts[id] = {
      sum: ranges.reduce((acc, range) => acc + (range.end - range.start), 0),
      ranges,
    };
  }

  let max = {
    id: null,
    sum: 0,
  };

  for (const id of Object.keys(shifts)) {
    const shift = shifts[id];
    if (max.sum < shift.sum) {
      max = {
        id,
        sum: shift.sum,
      };
    }
  }

  const minutes = new Int32Array(60).fill(0);
  for (const range of shifts[max.id].ranges) {
    for (let i = range.start; i <= range.end; i++) {
      minutes[i]++;
    }
  }

  const minute = minutes.findIndex(value => value === Math.max(...minutes));
  const answer = Number(max.id.replace('#', '')) * minute;

  console.log(`Answer: ${answer}`);
})();
