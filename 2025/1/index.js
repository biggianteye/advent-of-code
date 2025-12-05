import fs from "fs";

const args = process.argv.slice(2);
if (args.length == 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const lines = fs.readFileSync(file, "utf-8").split("\n");

const result = lines.reduce((acc, line) => {
    // Skip any empty lines
    if (!line) {
        return acc;
    }
    let turns = Number(line.slice(1));
    // Left = negative turn, Right = positive turn
    if (line.slice(0,1) == "L") {
        turns *= -1;
    }
    acc.position = (acc.position + turns) % 100;
    if (acc.position == 0) {
        acc.zeroCount++;
    }
    return acc;
}, { position: 50, zeroCount: 0 });

console.log(result.zeroCount);