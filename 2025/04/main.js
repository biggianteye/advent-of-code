import fs from "fs";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const layout = fs.readFileSync(file, "utf-8")
  .split("\n")
  .filter(x => x !== "")
  .map(x => x.split(""));

console.log(layout.map(row => row.join("")).join("\n"));