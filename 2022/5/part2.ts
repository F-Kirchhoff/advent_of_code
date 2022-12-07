import * as fs from "fs";
export {};

interface Input {
  moves: string[];
  stacks: string[][];
}

interface Move {
  origin: number;
  destination: number;
  amount: number;
}

function getInput(currentChallengeIndex: number): Input {
  const [initStackStrings, moves] = fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n\n")
    .map((string) => string.split("\n"));

  const inputRows = initStackStrings.length;
  const rowLength = initStackStrings[0].length + 1;

  console.log("start");

  const stacks = [];

  for (const row of initStackStrings.reverse()) {
    for (let index = 0; index < rowLength; index += 4) {
      const stackIndex = Math.floor(index / 4);
      const currentStack = stacks[stackIndex] || [];
      const slice = row
        .slice(index, index + 4)
        .replace("[", "")
        .replace("]", "")
        .replace(/[0-9]/, "")
        .trim();
      if (slice === "") continue;
      stacks[stackIndex] = [...currentStack, slice];
    }
  }

  return { moves, stacks };
}

function parseMove(move: string): Move {
  const [amount, origin, destination] = move
    .split(" ")
    .filter((string) => !/[a-z]/.test(string))
    .map(Number);

  return {
    origin: origin - 1,
    destination: destination - 1,
    amount,
  };
}

function forX(repititions: number, callback: () => any): void {
  if (repititions === 0) return;
  callback();
  forX(--repititions, callback);
}

const { moves, stacks } = getInput(5);

const instructions = moves.map(parseMove);

instructions.forEach(({ origin, destination, amount }) => {
  const crates = stacks[origin].splice(-amount, amount);
  console.log(crates);
  stacks[destination].push(...crates);
});

const answer = stacks.map((stack) => stack.at(-1)).join("");

console.log(answer);
