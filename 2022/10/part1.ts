import * as fs from "fs";
export {};

interface Instruction {
  code: string;
  value: number | null;
}

interface MemoryBlock {
  cycle: number;
  registerX: number;
}

interface Programm {
  registerX: number;
  cycleIndex: number;
  memory: MemoryBlock[];
  execute: (Instruction) => void;
  updateMemory: () => void;
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

function createProgram(): Programm {
  return {
    registerX: 1,
    cycleIndex: 0,
    memory: [],
    execute: function (instr: Instruction): void {
      switch (instr.code) {
        case "noop":
          this.cycleIndex++;
          this.updateMemory();
          break;

        case "addx":
          this.cycleIndex++;
          this.updateMemory();

          this.cycleIndex++;
          this.updateMemory();
          this.registerX += instr.value;
          break;

        default:
          console.log("ERROR: You did something stupid.");
      }
    },
    updateMemory: function (): void {
      if ((this.cycleIndex - 20) % 40 === 0) {
        this.memory.push({
          cycle: this.cycleIndex,
          registerX: this.registerX,
        });
      }
    },
  };
}

const displayProgramm: Programm = createProgram();
const instructions: Instruction[] = getInput(10).map(parseLine);

instructions.forEach((instruction) => displayProgramm.execute(instruction));

console.log(displayProgramm.memory);

const signalStrengths: number[] = displayProgramm.memory.map(
  (block) => block.cycle * block.registerX
);
const result = signalStrengths.reduce((a, b) => a + b, 0);

console.log(result);
