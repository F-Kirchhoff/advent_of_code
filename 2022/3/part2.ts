import * as fs from "fs";

import { InputFiles } from "../../node_modules/typescript/lib/typescript";

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

function getOverlap(string1: string, string2: string, string3: string): string {
  return [...string1].find(
    (char) => string2.includes(char) && string3.includes(char)
  );
}

const input = getInput(3);
let groups = [];

for (let index = 0; index < input.length; index += 3) {
  groups.push({
    bag1: input[index],
    bag2: input[index + 1],
    bag3: input[index + 2],
  });
}
const groupBadges = groups.map(({ bag1, bag2, bag3 }) =>
  getOverlap(bag1, bag2, bag3)
);

console.log(groupBadges);

const sumOfPriorities = groupBadges.reduce(
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

export {};
