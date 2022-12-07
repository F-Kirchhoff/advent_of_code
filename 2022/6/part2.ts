import * as fs from "fs";
export {};

function getInput(currentChallengeIndex: number): string {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString();
}

const dataStream = getInput(6);

let index = 13;
while (index++ <= dataStream.length - 1) {
  const convolution = dataStream.substring(index - 14, index);
  if (convolution.length === new Set([...convolution]).size) break;
}

console.log(index);
