import * as fs from "fs";
export {};

function getInput(currentChallengeIndex: number): string[] {
  return fs
    .readFileSync("./2022/" + currentChallengeIndex + "/input.txt")
    .toString()
    .split("\n");
}

function createDir(name, parent = null) {
  return {
    type: "DIR",
    name,
    size: null,
    content: [],
    getParent: function () {
      return parent;
    },
    addDir: function (name) {
      const newDir = createDir(name, this);
      this.content.push(newDir);
      return newDir;
    },
    addFile: function (name, size) {
      this.content.push({
        type: "FILE",
        name,
        size: Number(size),
      });
    },
    calculateSize: function () {
      this.size = this.content
        .map((item) => {
          if (item.type === "FILE") {
            return item.size;
          } else if (item.type === "DIR") {
            item.calculateSize();
            return item.size;
          }
        })
        .reduce((sum, num) => sum + num, 0);
    },
  };
}

function getDirs(dir) {
  const direktSubDirs = dir.content.filter((item) => item.type === "DIR");

  const subDirs = direktSubDirs.reduce((dirList, dir) => {
    return [...dirList, ...getDirs(dir)];
  }, []);

  return [dir, ...subDirs];
}

const lines = getInput(7).map((string) => string.split(" "));

const root = createDir("/");
let currentDir = root;

for (const line of lines.slice(1)) {
  if (line[0] === "$" && line[1] === "cd") {
    const dirName = line[2];
    switch (dirName) {
      case "/":
        currentDir = root;
        break;
      case "..":
        currentDir = currentDir.getParent();
        break;
      default:
        const searchedDir = currentDir.content.find(
          (item) => item.type === "DIR" && item.name === dirName
        );
        currentDir = searchedDir || currentDir.addDir(dirName);
    }
  } else if (line[0] === "$" && line[1] === "ls") {
    continue;
  } else if (line[0] === "dir") {
    const dirName = line[1];

    const hasSubDir = !!currentDir.content.find(
      (item) => item.type === "DIR" && item.name === dirName
    );

    if (!hasSubDir) {
      currentDir.addDir(dirName);
    }
  } else if (/^[0-9]+$/.test(line[0])) {
    const fileName = line[1];
    const fileSize = line[0];

    const hasDirFile = !!currentDir.content.find(
      (item) => item.type === "FILE" && item.name === fileName
    );

    if (!hasDirFile) {
      currentDir.addFile(fileName, Number(fileSize));
    }
  } else {
    console.log("SOMETHING WENT WRONG", line);
    process.exit(1);
  }
}

root.calculateSize();

const allDirs = getDirs(root).sort((a, b) => a.size - b.size);

const freeSpace = 70000000 - root.size;
const spaceNeeded = 30000000 - freeSpace;

const boroDir = allDirs.find((dir) => dir.size > spaceNeeded);

console.log(spaceNeeded);

console.log(boroDir.size);
