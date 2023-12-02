

function findMax(...args) {
  let max = -Infinity;
  for (const num of args) {
    if (num > max) {
      max = num;
    }
  }
  
    {
      return max;
    }
  }

console.log(findMax(1, 2, 3))