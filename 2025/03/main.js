import fs from "fs";

import {joltage} from "./joltage.js";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const banks = fs.readFileSync(file, "utf-8").split("\n");

console.log("Part 1: ", joltage(banks, 2));
console.log("Part 2: ", joltage(banks, 12));
