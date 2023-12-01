import { getInput, log } from "../../lib/utils";

const data = getInput("2023", "01");

const result = data
  .map((line) => line.split("").filter((char) => !Number.isNaN(Number(char))))
  .map((digits) => Number(`${digits.at(0)}${digits.at(-1)}`))
  .reduce((a, b) => a + b);

log(result);
