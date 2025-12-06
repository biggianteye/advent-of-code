import fs from "fs";

import {calculate} from "./calculate.js";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const lines = fs.readFileSync(file, "utf-8").split("\n");

const result = calculate(lines);

console.log(`Method A: ${result.zeroCountA}`);
console.log(`Method B: ${result.zeroCountB}`);

if (result.zeroCountA > 0 && result.zeroCountB < result.zeroCountA) {
    console.error("[ERROR] Method B is definitely not correct!")
}