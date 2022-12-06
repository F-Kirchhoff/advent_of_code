import * as fs from "fs";

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

console.log("test");

const input = getInput(3);
const rucksacks = input.map((string) => ({
  c1: string.substring(0, string.length / 2),
  c2: string.substring(string.length / 2),
}));

console.log(
  rucksacks.every((rucksack) => rucksack.c1.length === rucksack.c2.length)
);

export {};
