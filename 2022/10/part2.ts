import * as fs from "fs";
import { collapseTextChangeRangesAcrossMultipleVersions } from "../../node_modules/typescript/lib/typescript";
export {};

interface Instruction {
  code: string;
  value: number | null;
}

interface CPU {
  registerX: number;
  cycleIndex: number;
  screenBuffer: string[];
  execute: (Instruction) => void;
  tick: () => void;
  draw: () => void;
}

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

function parseLine(line: string): Instruction {
  const [code, value = null] = line.split(" ");
  return {
    code,
    value: value !== null ? Number(value) : null,
  };
}

function createCPU(): CPU {
  return {
    registerX: 1,
    cycleIndex: 0,
    screenBuffer: [],

    execute: function (instr: Instruction): void {
      switch (instr.code) {
        case "noop":
          this.tick();
          break;

        case "addx":
          this.tick();
          this.tick();
          this.registerX += instr.value;
          break;

        default:
          console.log("ERROR: You did something stupid.");
      }
    },
    draw: function () {
      const currentDrawX = (this.cycleIndex - 1) % 40;
      const isLit: boolean = Math.abs(currentDrawX - this.registerX) <= 1;

      if (currentDrawX === 0) {
        this.screenBuffer.push("\n");
      }
      this.screenBuffer.push(isLit ? "#" : ".");
    },
    tick: function () {
      this.cycleIndex++;
      this.draw();
    },
  };
}

const displayProgram: CPU = createCPU();
const instructions: Instruction[] = getInput(10).map(parseLine);

instructions.forEach((instruction) => displayProgram.execute(instruction));

const screenOutput = displayProgram.screenBuffer.reduce(
  (output, symbol) => output + symbol,
  ""
);

console.log(screenOutput);
