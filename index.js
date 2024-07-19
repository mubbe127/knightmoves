

function cell(i, j) {
  this.value = [i, j];
  this.link = [];
}

class knightMoves {
  constructor() {
    this.array = this.createArray();
    this.queue = [];
  }

  createArray() {
    let array = [];
    for (let i = 0; i < 8; i++) {
      array.push([]);

      for (let j = 0; j < 8; j++) {
        array[i].push([]);
        array[i][j] = new cell(i, j);
      }
      1;
    }
    return array;
  }

  moves() {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = 0; j < this.array[i].length; j++) {
        // Check if the move (i+2, j+1) is within bounds

        if (i + 2 < this.array.length && j + 1 < this.array[i].length) {
          this.array[i][j].link.push(this.array[i + 2][j + 1]);
        }
        if (i + 2 < this.array.length && j - 1 >= 0) {
          this.array[i][j].link.push(this.array[i + 2][j - 1]);
        }
        if (i - 2 >= 0 && j - 1 > 0) {
          this.array[i][j].link.push(this.array[i - 2][j - 1]);
        }
        if (i - 2 >= 0 && j + 1 < this.array[i].length) {
          this.array[i][j].link.push(this.array[i - 2][j + 1]);
        }

        if (i + 1 < this.array.length && j + 2 < this.array[i].length) {
          this.array[i][j].link.push(this.array[i + 1][j + 2]);
        }
        if (i + 1 < this.array.length && j - 2 >= 0) {
          this.array[i][j].link.push(this.array[i + 1][j - 2]);
        }
        if (i - 1 >= 0 && j + 2 < this.array[i].length) {
          this.array[i][j].link.push(this.array[i - 1][j + 2]);
        }
        if (i - 1 >= 0 && j - 2 >= 0) {
          this.array[i][j].link.push(this.array[i - 1][j - 2]);
        }
      }
    }
  }

  jiep(start, end) {
    this.queue = [[start, [start]]]
    const visited = new Map();
    const shortestPaths = [];
    let shortestPathLength = Infinity;

    // Initialize the queue with the start node and an empty path

    visited.set(start.toString(), [start]);

    while (this.queue.length > 0) {
      const [currentpos, path] = this.queue.shift();
      const [x, y] = currentpos
      const currentPathlength = path.length;
 
  
      if (currentPathlength > shortestPathLength) break;
      
      
      if (x === end[0] && y === end[1]) {
        if (currentPathlength <= shortestPathLength) {
          shortestPathLength = currentPathlength;
          shortestPaths.push(path);
        }
        continue;
      }

      // If the current path length exceeds the known shortest path length, we can stop
    
      for (let link of this.array[x][y].link) {
        const linkKey = `${link.value[0]},${link.value[1]}`;
        if (!visited.has(linkKey) || visited.get(linkKey) >= currentPathlength + 1) {
          visited.set(linkKey, currentPathlength + 1);
          this.queue.push([[link.value[0], link.value[1]], [...path, [link.value[0], link.value[1]]]])
        }
      }
    }

    return shortestPaths
  }

}

const jiep = new knightMoves();
jiep.moves();
console.log(jiep.array[6][0].link);
console.log(jiep.jiep([0,1],[3,2]));
