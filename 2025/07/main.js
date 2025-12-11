import fs from "fs";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

// Split diagram into a 2d array, for easier processing
const diagram = fs.readFileSync(file, "utf-8")
  .split("\n")
  .filter(x => x !== "")
  .map(x => x.split(""))

const printDiagram = () => console.log(
  diagram
    .map(x => x.join(""))
    .join("\n"),
  "\n"
);

const width = diagram[0].length;
const height = diagram.length;

if (height < 20) {
  printDiagram();
}

const EMPTY = ".";
const SPLITTER = "^";
const START = "S";
const BEAM = "|";

// PART 1

let splits = 0;
for (let row = 1; row<height; row++) {
  for (let col = 0; col<width; col++) {
    const above = diagram[row-1][col];
    switch (diagram[row][col]) {
      case EMPTY:
        if (above === START || above === BEAM) {
          diagram[row][col] = BEAM;
        }
        break;
      case SPLITTER:
        if (above === BEAM) {
          // Split the beam!
          diagram[row][col-1] = BEAM;
          diagram[row][col+1] = BEAM;
          splits++;
        }
        break;
    }
  }

  if (height < 20) {
    printDiagram();
  }
}

console.log("Number of splits: ", splits);

// PART 2

// Keep track of how many paths seen so far
let beamLine = new Array(width).fill(0);
beamLine[diagram[0].indexOf(START)] = 1;

for (const line of diagram) {
  const nextBeamLine = new Array(width).fill(0);

  for (let i = 0; i<width; i++) {
    const beamsAbove = beamLine[i];
    if (beamsAbove > 0) {
      if (line[i] === SPLITTER) {
        // Assumption: No splitters at the edges
        nextBeamLine[i - 1] += beamsAbove;
        nextBeamLine[i + 1] += beamsAbove;
      } else {
        nextBeamLine[i] += beamsAbove;
      }
    }
  }

  beamLine = nextBeamLine;
}
const timelines = beamLine.reduce((acc, val) => acc + val);
console.log("Number of timelines:", timelines);
