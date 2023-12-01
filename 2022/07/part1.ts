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

function findDirsBelow100000(dir) {
  const subDirs = dir.content.filter((item) => item.type === "DIR");

  return subDirs.reduce((candidates, dir) => {
    const subCandidates = findDirsBelow100000(dir);
    if (dir.size <= 100000)
      subCandidates.push({
        name: dir.name,
        size: dir.size,
      });
    return [...candidates, ...subCandidates];
  }, []);
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
console.log(root.size);

console.log(JSON.stringify(root, null, 2));

const dirsBelow100000 = findDirsBelow100000(root);
console.log(dirsBelow100000);

const sum = dirsBelow100000.reduce((sum, dir) => sum + dir.size, 0);

console.log(sum);
