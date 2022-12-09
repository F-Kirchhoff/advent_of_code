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
  pieces: Point[];
  head: Point;
  moveHead: (Instruction) => void;
  moveRope: () => void;
}

function parseLine(string: string): Instruction {
  const [dir, stepsString] = string.split(" ");
  return {
    dir,
    steps: Number(stepsString),
  };
}

const START: Point = {
  x: 0,
  y: 0,
};

function createRope(): Rope {
  const pieces = Array(10)
    .fill(null)
    .map(() => ({
      ...START,
    }));
  return {
    pieces,
    head: pieces[0],
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
    moveRope: function (): void {
      for (let index = 1; index < this.pieces.length; index++) {
        const delta: Point = {
          x: this.pieces[index - 1].x - this.pieces[index].x,
          y: this.pieces[index - 1].y - this.pieces[index].y,
        };
        const length: number = Math.sqrt(delta.x ** 2 + delta.y ** 2);
        this.pieces[index].x += Math.sign(delta.x) * Math.floor(length / 2);
        this.pieces[index].y += Math.sign(delta.y) * Math.floor(length / 2);
      }
    },
  };
}

const instructions: Instruction[] = getInput(9).map(parseLine);
const rope: Rope = createRope();
console.log(rope);

const tailTrack: Point[] = [];

for (const instr of instructions) {
  for (const _i of Array(instr.steps).fill(null)) {
    rope.moveHead(instr);
    rope.moveRope();

    const wasTailHere = tailTrack.some(
      (point) =>
        point.x === rope.pieces.at(-1).x && point.y === rope.pieces.at(-1).y
    );

    if (!wasTailHere) {
      tailTrack.push({ ...rope.pieces.at(-1) });
    }
  }
}

console.log(tailTrack.length);
