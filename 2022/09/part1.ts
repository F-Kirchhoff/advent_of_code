import * as fs from "fs";
export {};

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n")
    .map((string) => string.trim());
}

interface Point {
  x: number;
  y: number;
}

interface Instruction {
  dir: string;
  steps: number;
}

interface Rope {
  head: Point;
  tail: Point;
  moveHead: (Instruction) => void;
  moveTail: () => void;
}

function parseLine(string: string): Instruction {
  const [dir, stepsString] = string.split(" ");
  return {
    dir,
    steps: Number(stepsString),
  };
}

function createRope(): Rope {
  return {
    head: {
      x: 0,
      y: 0,
    },
    tail: {
      x: 0,
      y: 0,
    },
    moveHead: function (instr: Instruction): void {
      switch (instr.dir) {
        case "U":
          this.head.y++;
          break;
        case "D":
          this.head.y--;
          break;
        case "L":
          this.head.x--;
          break;
        case "R":
          this.head.x++;
          break;
        default:
          console.log("SOMETHING WENT TERRIBLY WRONG!!!");
      }
    },
    moveTail: function (): void {
      const delta: Point = {
        x: this.head.x - this.tail.x,
        y: this.head.y - this.tail.y,
      };
      const length: number = Math.sqrt(delta.x ** 2 + delta.y ** 2);
      this.tail.x += Math.sign(delta.x) * Math.floor(length / 2);
      this.tail.y += Math.sign(delta.y) * Math.floor(length / 2);
    },
  };
}

const instructions: Instruction[] = getInput(9).map(parseLine);
const rope: Rope = createRope();

const tailTrack: Point[] = [{ ...rope.tail }];

for (const instr of instructions) {
  for (const _i of Array(instr.steps).fill(null)) {
    rope.moveHead(instr);
    rope.moveTail();

    const wasTailHere = tailTrack.some(
      (point) => point.x === rope.tail.x && point.y === rope.tail.y
    );

    if (!wasTailHere) {
      tailTrack.push({ ...rope.tail });
    }
  }
}

console.log(tailTrack.length);
