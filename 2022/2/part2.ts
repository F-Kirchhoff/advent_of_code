import fs from "fs";

function getInput(currentChallengeIndex: number): string {
  return String(
    fs.readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
  );
}

function parseLine(string: string): string[] {
  return string.split(" ").map((string) => {
    switch (string) {
      case "A":
        return "ROCK";
      case "B":
        return "PAPER";
      case "C":
        return "SCISSORS";
      default:
        return string;
    }
  });
}

const scoreMap = new Map<string, number>([
  ["ROCK", 1],
  ["PAPER", 2],
  ["SCISSORS", 3],
]);

const winningMap = new Map<string, string>([
  ["ROCK", "SCISSORS"],
  ["PAPER", "ROCK"],
  ["SCISSORS", "PAPER"],
]);

const loosingMap = new Map<string, string>([
  ["ROCK", "PAPER"],
  ["PAPER", "SCISSORS"],
  ["SCISSORS", "ROCK"],
]);

function findCorrectMove(game: string[]): string[] {
  switch (game[1]) {
    case "X":
      return [game[0], winningMap.get(game[0]) || ""];
    case "Y":
      return [game[0], game[0]];
    case "Z":
      return [game[0], loosingMap.get(game[0]) || ""];
    default:
      return ["", ""];
  }
}

function determineScore(moves: string[]): number {
  if (moves[0] === moves[1]) return 3;
  if (winningMap.get(moves[1]) === moves[0]) return 6;
  return 0;
}

const rawGameList = getInput(2).split("\n").map(parseLine);

const gameList = rawGameList.map(findCorrectMove);
rawGameList.forEach((game, index) => console.log(game[1], gameList[index]));

console.log(gameList);

const gameScores = gameList.map(
  (game) => (scoreMap.get(game[1]) || 0) + determineScore(game)
);

const sum = gameScores.reduce((sum, item) => sum + item, 0);

console.log(gameScores);
console.log(sum);
