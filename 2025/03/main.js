import fs from "fs";

import {joltage} from "./joltage.js";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const banks = fs.readFileSync(file, "utf-8").split("\n");

const result = joltage(banks);

console.log(result);