export const markAccessibleRolls = (layout) => {
  // Assuming that the input is a complete rectangular grid
  const width = layout[0].length;
  const height = layout.length;

  for (let x = 0; x<width; x++) {
    for (let y = 0; y<height; y++) {
      // process.stdout.write(layout[x][y]);
      let surroundingRolls = 0;
      if (layout[x][y] === "@") {
        // top left
        if (x > 0 && y > 0 && layout[x-1][y-1] !== ".") {
          surroundingRolls++;
        }
        // top middle
        if (y > 0 && layout[x][y-1] !== ".") {
          surroundingRolls++;
        }
        // top right
        if (x < width-1 && y > 0 && layout[x+1][y-1] !== ".") {
          surroundingRolls++;
        }
        // left
        if (x > 0 && layout[x-1][y] !== ".") {
          surroundingRolls++;
        }
        // right
        if (x < width-1 && layout[x+1][y] !== ".") {
          surroundingRolls++;
        }
        // bottom left
        if (x > 0 && y < height-1 && layout[x-1][y+1] !== ".") {
          surroundingRolls++;
        }
        // bottom middle
        if (y < height-1 && layout[x][y+1] !== ".") {
          surroundingRolls++;
        }
        // bottom right
        if (x < width-1 && y < height-1 && layout[x+1][y+1] !== ".") {
          surroundingRolls++;
        }

        if (surroundingRolls < 4) {
          layout[x][y] = "x";
        }
      }

      // console.log(x, y, surroundingRolls);
    }
  }
}

export const countAccessibleRolls = (layout) => {
  return layout.flat().filter((cell) => cell === "x").length;
}

export const removeAccessibleRolls = (layout) => {
  const width = layout[0].length;
  const height = layout.length;

  for (let x = 0; x<width; x++) {
    for (let y = 0; y < height; y++) {
      if (layout[x][y] === "x") {
        layout[x][y] = ".";
      }
    }
  }
}
