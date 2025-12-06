import fs from "fs";

import {analyse} from "./analyse.js";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const ranges = fs.readFileSync(file, "utf-8").split(",");

const result = analyse(ranges);

console.log(result);