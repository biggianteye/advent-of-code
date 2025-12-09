import fs from "fs";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const ranges = fs.readFileSync(file, "utf-8")
  .split("\n\n")[0]
  .split("\n")
  // Extract the start and end
  .map((x) => {
    const [ start, end ] = x.split("-").map(x => Number(x));
    return { start, end };
  })
  // Sort the ranges to make it easier to detect overlaps
  .sort((a, b) => a.start - b.start || a.end - b.end)
  // Combine overlapping ranges
  .reduce((acc, candidateRange) => {
    if (acc.length === 0) {
      console.log("new")
      acc.push(candidateRange)
      return acc;
    }
    const lastRange = acc[acc.length-1];
    console.log(lastRange, candidateRange)
    if (candidateRange.start >= lastRange.start && candidateRange.end <= lastRange.end) {
      console.log("skip");
      // New range is entirely within previous one, so bin it
      return acc;
    }

    if (candidateRange.start >= lastRange.start && candidateRange.start <= lastRange.end && candidateRange.end > lastRange.end) {
      console.log("extend")
      lastRange.end = candidateRange.end;
      return acc;
    }

    console.log("append")
    acc.push(candidateRange);
    return acc;
  }, []);

const available = fs.readFileSync(file, "utf-8")
  .split("\n\n")[1]
  .split("\n")
  .filter(x => x !== "")
  .map(x => Number(x));

console.log(ranges)
console.log(available)

let numAvailable = 0;
available.forEach((item) => {
  if (ranges.some((range) => range.start <= item && range.end >= item)) {
    console.log(`Item ${item}: Fresh`);
    numAvailable++;
  } else {
    console.log(`Item ${item}: Spoiled`);
  }
});

console.log(`There are ${numAvailable} fresh ingredients.`)

const totalFreshIngredientIds = ranges
  .map(range => (range.end - range.start) + 1)
  .reduce((acc, val) => acc + val, 0);
console.log(`The fresh ingredient ranges contain ${totalFreshIngredientIds} IDs`);
