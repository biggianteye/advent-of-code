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
const equations = fs.readFileSync(file, "utf-8")
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

console.log(equations);

// Run all the equations and work out the total
const total = equations.reduce((cumulativeTotal, equation) => {
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

console.log("Total: ", total);
