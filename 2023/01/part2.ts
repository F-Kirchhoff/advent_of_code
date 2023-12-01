import { getInput, log } from "../../lib/utils";

const data = getInput("2023", "01");

const NUM_MAP = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
} as const;

const digits = Object.keys(NUM_MAP) as (keyof typeof NUM_MAP)[];

function findFirstDigit(line: string) {
  const firstDigit = digits
    .map((digit) => [NUM_MAP[digit], line.indexOf(digit)] as const)
    .filter((digit) => digit[1] !== -1)
    .reduce(
      (lowest, current) =>
        Number(current[1]) < Number(lowest[1]) ? current : lowest,
      ["1", Infinity]
    );
  return firstDigit[0];
}

function reverse(string: string) {
  return string.split("").reverse().join("");
}

function findLastDigit(line: string) {
  const lastDigit = digits
    .map(
      (digit) =>
        [NUM_MAP[digit], reverse(line).indexOf(reverse(digit))] as const
    )
    .filter((digit) => digit[1] !== -1)
    .reduce(
      (highest, current) =>
        Number(current[1]) < Number(highest[1]) ? current : highest,
      ["1", Infinity]
    );
  return lastDigit[0];
}

const result = data
  .map((line) => Number(`${findFirstDigit(line)}${findLastDigit(line)}`))
  .reduce((a, b) => a + b);
log(data);
log(result);
