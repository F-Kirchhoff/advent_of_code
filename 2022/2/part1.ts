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
      case "X":
        return "ROCK";
      case "B":
      case "Y":
        return "PAPER";
      case "C":
      case "Z":
        return "SCISSORS";
      default:
        return "";
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

function determineScore(moves: string[]): number {
  if (moves[0] === moves[1]) return 3;
  if (winningMap.get(moves[1]) === moves[0]) return 6;
  return 0;
}

const gameList = getInput(2).split("\n").map(parseLine);

const gameScores = gameList.map(
  (game) => (scoreMap.get(game[1]) || 0) + determineScore(game)
);

const sum = gameScores.reduce((sum, item) => sum + item, 0);

console.log(gameScores);
console.log(sum);
