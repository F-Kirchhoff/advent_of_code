import * as fs from "fs";

const index = "01";

function getInput(currentChallengeIndex: string) {
  return fs
    .readFileSync("./2023/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

const data = getInput(index);
