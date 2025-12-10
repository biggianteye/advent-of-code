import fs from "fs";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

// Custom transpose function that can be used in array function chaining.
// Adapted from https://stackoverflow.com/a/35518127/966703
// and https://stackoverflow.com/a/36164530/966703
Object.defineProperty(Array.prototype, 'transpose', {
  value: function() {
    return this[0].map((x,i) => this.map(x => x[i]));
  }
});

// Grab all the equations from the input
const part1Equations = fs.readFileSync(file, "utf-8")
  .split("\n")
  .filter(x => x !== "")
  .map(x => x.trim().split(/ +/g))
  // Data is in columns, so transpose it.
  .transpose()
  // Transform it into a more useful form
  .map((x) => {
    // eg. [ "123", "45", "6", "*" ] => { operator: "*", operands: [ 123, 45, 6 ] }
    return {
      operator: x[x.length-1],
      operands: x.slice(0, x.length-1).map(y => Number(y))
    }
  })

const part2Equations = fs.readFileSync(file, "utf-8")
  .split("\n")
  .filter(x => x !== "")
  .map(x => x.split(""))
  // Text is column based, so rotate the raw text to make it easier to work with
  .transpose()
  // Recombine the individual characters. eg.
  // 1  *
  // 24
  // 356
  //
  // 269+
  // 248
  // 8
  .map(x => x.join(""))
  // Split by original divider columns
  .reduce((acc, line) => {
    if (acc.length === 0) { // first line
      acc.push([line]);
    } else if (line.match(/^ +$/)) { // empty line
      acc.push([]);
    } else {
      acc[acc.length-1].push(line); // everything else
    }
    return acc;
  }, [])
  // Transform it into a more useful form
  .map(x => {
    // eg. [ '1  *', '24  ', '356 ' ] => { operator: "+", operands: [ 1, 24, 356 ] }
    return {
      operator: x[0].at(x[0].length-1), // '1  *' => "*"
      operands: x.map(y => Number(y.slice(0, y.length-1).trim()))
    }
  })

// Run all the equations and work out the total
const calculateTotals = (equations) => equations.reduce((cumulativeTotal, equation) => {
  switch (equation.operator) {
    case "+":
      return cumulativeTotal + equation.operands.reduce((partialSum, val) => partialSum + val, 0);
    case "*":
      return cumulativeTotal + equation.operands.reduce((partialSum, val) => partialSum * val, 1);
    default:
      console.log("[ERROR] Ignoring unknown operator: ", equation.operator);
      return cumulativeTotal
  }
}, 0)

console.log("Total for part 1: ", calculateTotals(part1Equations));
console.log("Total for part 2: ", calculateTotals(part2Equations));
