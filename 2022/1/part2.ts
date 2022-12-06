import fs from "fs";

function getInput(currentChallengeIndex: number): string {
  return String(
    fs.readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
  );
}

const elvesInventories = getInput(1)
  .split("\n\n")
  .map((inventoryString) =>
    inventoryString.split("\n").map((string) => Number(string))
  );

const summedInventories = elvesInventories.map((inventory) =>
  inventory.reduce((sum, item) => sum + item, 0)
);

const topThreeInventories = summedInventories
  .sort((a, b) => b - a)
  .splice(0, 3);

console.log(
  topThreeInventories,
  topThreeInventories.reduce((sum, item) => sum + item, 0)
);

export {};
