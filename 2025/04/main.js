import fs from "fs";

import {countAccessibleRolls, markAccessibleRolls} from "./getAccessibleRolls.js";

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

const updatedLayout = markAccessibleRolls(layout);

console.log(updatedLayout.map(row => row.join("")).join("\n"));

console.log(countAccessibleRolls(updatedLayout));
