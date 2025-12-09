import fs from "fs";

import {countAccessibleRolls, markAccessibleRolls, removeAccessibleRolls} from "./rolls.js";

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

const printLayout = (layout) => console.log(
  layout
    .map(row => row.join(""))
    .join("\n")
);

console.log("Initial layout:")
printLayout(layout);

let accessibleRolls;
let totalRollsRemoved = 0;
while (true) {
  markAccessibleRolls(layout);
  accessibleRolls = countAccessibleRolls(layout);
  if (accessibleRolls === 0) {
    break;
  }
  console.log(`\nRemoved ${accessibleRolls} roll${accessibleRolls > 1 ? "s": ""}:`)
  printLayout(layout);
  removeAccessibleRolls(layout);
  totalRollsRemoved += accessibleRolls;
}

console.log("\nFinal layout:")
printLayout(layout);

console.log(`\nTotal rolls removed: ${totalRollsRemoved}`);