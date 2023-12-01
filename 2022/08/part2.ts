import * as fs from "fs";
export {};

interface Grid {
  items: number[][];
  rows: number;
  cols: number;
  getRow: (number) => number[];
  getCol: (number) => number[];
}

function getInput(currentChallengeIndex: number): number[][] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n")
    .map((line) => line.split("").map((string) => Number(string)));
}

function greateGrid(input: number[][]): Grid {
  return {
    items: input,
    rows: input.length,
    cols: input[0].length,
    getRow: function (index: number) {
      return this.items[index];
    },
    getCol: function (index: number) {
      return this.items.map((row) => row[index]);
    },
  };
}

function countVisibleTrees(targetTree: number, line: number[]): number {
  const count = line.findIndex((tree) => tree >= targetTree);

  if (count === -1) {
    return line.length;
  }
  return count + 1;
}

const input = getInput(8);
const forest = greateGrid(input);

let maxVisibilityScore = 0;

for (let rowIndex = 1; rowIndex < forest.rows - 1; rowIndex++) {
  for (let colIndex = 1; colIndex < forest.cols - 1; colIndex++) {
    const targetTree = forest.items[rowIndex][colIndex];
    const row = forest.getRow(rowIndex);
    const col = forest.getCol(colIndex);

    const leftTrees = countVisibleTrees(
      targetTree,
      row.slice(0, colIndex).reverse()
    );
    const rightTrees = countVisibleTrees(targetTree, row.slice(colIndex + 1));
    const upTrees = countVisibleTrees(
      targetTree,
      col.slice(0, rowIndex).reverse()
    );
    const downTrees = countVisibleTrees(targetTree, col.slice(rowIndex + 1));

    const newVisibilityScore = leftTrees * rightTrees * upTrees * downTrees;

    maxVisibilityScore = Math.max(maxVisibilityScore, newVisibilityScore);
  }
}

console.log(maxVisibilityScore);
