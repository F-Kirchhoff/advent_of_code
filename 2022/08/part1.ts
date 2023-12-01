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

function checkIfVisible(array: number[], index: number): boolean {
  const targetTree = array[index];

  const isVisibleBefore = array
    .slice(0, index)
    .every((tree) => tree < targetTree);
  if (isVisibleBefore) return true;

  const isVisibleAfter = array
    .slice(index + 1)
    .every((tree) => tree < targetTree);
  if (isVisibleAfter) return true;

  return false;
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
const input = getInput(8);
const forest = greateGrid(input);

const visibleTrees = [
  ...forest.getRow(0),
  ...forest.getRow(forest.rows - 1),
  ...forest.getCol(0).splice(1, forest.cols - 2),
  ...forest.getCol(forest.cols - 1).splice(1, forest.cols - 2),
];

for (let rowIndex = 1; rowIndex < forest.rows - 1; rowIndex++) {
  for (let colIndex = 1; colIndex < forest.cols - 1; colIndex++) {
    if (
      checkIfVisible(forest.getRow(rowIndex), colIndex) ||
      checkIfVisible(forest.getCol(colIndex), rowIndex)
    ) {
      visibleTrees.push(forest.items[rowIndex][colIndex]);
    }
  }
}

console.log(visibleTrees.length);
