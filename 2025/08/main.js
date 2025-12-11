import * as fs from "fs";

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
}

const file = args[0];

const boxes = fs.readFileSync(file, "utf-8")
  .split("\n")
  .filter(x => x !== "")
  .map((coords, id) => {
    const [x, y, z] = coords.split(",").map(str => Number(str));
    return { id, x, y, z, circuit: 0 }
  })

const numBoxes = boxes.length;

// console.log(boxes);
console.log("Number of boxes:", boxes.length)

const getDistance = (a,b) => {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2)
    + Math.pow(a.y - b.y, 2)
    + Math.pow(a.z - b.z, 2)
  )
}

const distances = [];
for (let i = 0; i < numBoxes; i++) {
  for (let j = i+1; j < numBoxes; j++) {
    const a = boxes[i];
    const b = boxes[j];
    distances.push({
      a,
      b,
      distance: getDistance(a, b),
    })
  }
}
distances.sort((a, b) => a.distance - b.distance)

console.log("Number of possible connections:", distances.length)
// console.log(distances);

const numConnectionsToMake= numBoxes === 20 ? 10 : 1000;
let newCircuitId = 1;
for (let i = 0; i<numConnectionsToMake; i++) {
  if (distances[i].a.circuit === 0 && distances[i].b.circuit === 0) {
    // Unconnected boxes! Put them into a circuit
    // console.log("add two to circuit", newCircuitId)
    distances[i].a.circuit = newCircuitId;
    distances[i].b.circuit = newCircuitId;
    newCircuitId++;
    continue;
  }

  // At least one of the boxes is in an existing circuit, so join/merge them.
  if (distances[i].a.circuit === 0) {
    distances[i].a.circuit = distances[i].b.circuit
    // console.log("add one to circuit", distances[i].b.circuit)
  } else if (distances[i].b.circuit === 0) {
    distances[i].b.circuit = distances[i].a.circuit
    // console.log("add one to circuit", distances[i].a.circuit)
  } else if (distances[i].a.circuit === distances[i].b.circuit) {
    // Both on the same existing circuit, so do nothing.
    // console.log("identical, so skip")
  } else {
    // Both boxes are part of different existing circuits. Merge them.
    // console.log("merge into circuit", distances[i].a.circuit)
    boxes.forEach((box) => {
      if (box.circuit === distances[i].b.circuit) {
        box.circuit = distances[i].a.circuit
      }
    })
  }
}

console.log("Boxes after connections:", boxes);
console.log(`Made ${numConnectionsToMake} shortest connections.`)
console.log("Product of 3 largest circuits:", boxes
  // Grab all the circuit IDs
  .map(x => x.circuit)
  // Skip any solo circuits
  .filter(x => x > 0)
  .sort()
  // Get the circuit sizes
  .reduce((acc, circuit) => {
      return acc[circuit] ? ++acc[circuit] : acc[circuit] = 1, acc
    }, [])
  // Grab the three biggest
  .sort((a, b) => b - a).slice(0,3)
  // Multiply them together
  .reduce((acc, num) => acc * num, 1)
)
