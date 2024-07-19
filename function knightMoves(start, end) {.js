function knightMoves(start, end) {
  function isWithinBounds(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function getKnightMoves(x, y) {
    const moves = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ];
    return moves.filter(([nx, ny]) => isWithinBounds(nx, ny));
  }

  if (start[0] === end[0] && start[1] === end[1]) {
    return [start];
  }

  const queue = [[start, [start]]];
  const shortestPath = [];
  let shortestPathLength = Infinity;
  const visited = new Map();
  visited.set(start.toString(), [start]);

  while (queue.length > 0) {
    const [currentPos, path] = queue.shift();
    const [x, y] = currentPos;
    console.log(visited.get())

    if (path.length > shortestPathLength) break;

    for (const [nx, ny] of getKnightMoves(x, y)) {
      const newPath = path.concat([[nx, ny]]);
      if (nx === end[0] && ny === end[1]) {
        shortestPath.push(path.concat([[nx, ny]]));
        shortestPathLength = path.length;
      }

      if (
        !visited.has([nx, ny].toString()) ||
        visited.get([nx, ny].toString()) >= newPath.length
      ) {
        queue.push([[nx, ny], newPath]);
        visited.set([nx, ny].toString(), newPath);
      }
     
    }
  }
 
  return shortestPath;
}

console.log(knightMoves([0, 1], [0, 1]));
