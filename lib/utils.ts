import { readFileSync } from "fs";

export function getInput(year: string, day: string) {
  return readFileSync([".", year, day, "input.txt"].join("/"))
    .toString()
    .split("\n");
}
