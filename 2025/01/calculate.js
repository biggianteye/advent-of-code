export const calculate = (lines) => {
    return lines.reduce((acc, line) => {
        const zeroStart = acc.position === 0;

        // Skip any empty lines
        if (!line) {
            return acc;
        }

        // Deal with any full rotations
        const totalTurns = Number(line.slice(1));
        const fullRotations = Math.floor(totalTurns/100);
        acc.zeroCountB += fullRotations;

        // Then dealing with the remaining turns becomes simpler
        let remainingTurns = totalTurns%100;
        // Left = negative turn, Right = positive turn
        if (line.slice(0,1) === "L") {
            remainingTurns *= -1;
        }

        acc.position += remainingTurns;
        if (acc.position > 100) {
            acc.position = acc.position%100;
            // If its over 100 then it has passed zero
            acc.zeroCountB++;
        } else if(acc.position === 100) {
            acc.position = 0;
        } else if (acc.position < 0) {
            acc.position += 100;
            if (!zeroStart) {
                // If it's negative, it passed zero (unless it started at zero)
                acc.zeroCountB++;
            }
        }

        if (acc.position === 0) {
            acc.zeroCountA++;
            acc.zeroCountB++;
        }

        // console.log(`${startPosition} + ${line} => ${acc.position}`);
        // console.log(`A: ${acc.zeroCountA}, B: ${acc.zeroCountB}`);
        return acc;
    }, { position: 50, zeroCountA: 0, zeroCountB: 0 });
}
