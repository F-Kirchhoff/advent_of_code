import * as fs from "fs";

interface Pair {
  range1: number[];
  range2: number[];
}

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

function parseLine(line: string): Pair {
  const ranges = line.split(",").map((range) => range.split("-").map(Number));

  return {
    range1: ranges[0],
    range2: ranges[1],
  };
}

function checkIfFirstContainsSecond(
  [r1Start, r1End]: number[],
  [r2Start, r2End]: number[]
): boolean {
  return r1Start <= r2Start && r1End >= r2End;
}

const rangePairs = getInput(4).map(parseLine);

const numberOfContainedPairs = rangePairs
  .map(
    ({ range1, range2 }) =>
      checkIfFirstContainsSecond(range1, range2) ||
      checkIfFirstContainsSecond(range2, range1)
  )
  .filter((isContained) => isContained).length;

console.log(numberOfContainedPairs);

export {};
