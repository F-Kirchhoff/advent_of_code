import * as fs from "fs";

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

function getOverlap(string1: string, string2: string): string {
  return [...string1].find((char) => string2.includes(char));
}

const input = getInput(3);
const rucksacks = input.map((string) => ({
  c1: string.substring(0, string.length / 2),
  c2: string.substring(string.length / 2),
}));
const wrongItems = rucksacks.map(({ c1, c2 }) => getOverlap(c1, c2));

const sumOfPriorities = wrongItems.reduce(
  (sum: number, char: string): number => {
    const lowerCase = new RegExp("[a-z]");
    if (lowerCase.test(char)) {
      return sum + char.charCodeAt(0) - 96;
    } else {
      return sum + char.charCodeAt(0) - 38;
    }
  },
  0
);

console.log(sumOfPriorities);
export {};
