export const joltage = (banks, numBatteries) => {
    const getBestBatteryIndex = (batteries, start, ignore) => {
        return batteries.indexOf(
            Math.max(...batteries.slice(start, batteries.length - ignore)),
            start
        );
    }

    return banks
        .filter((line) => line !== "")
        .reduce((acc, bank) => {
            // Approach:
            // - Example: 818181911112111
            // - Grab the highest number, excluding the last number. ie. 9
            // - Grab the highest number after that first one. ie. 2
            const batteries = bank.split("").map(x => Number(x));
            let currentBankJoltage = 0;
            let batteryIndex = -1;
            for (let i = numBatteries - 1; i>=0; i--) {
                batteryIndex = getBestBatteryIndex(batteries, batteryIndex+1, i);
                currentBankJoltage *= 10;
                currentBankJoltage += batteries[batteryIndex];
            }

            // console.log(bank, currentBankJoltage);

            return acc + currentBankJoltage;
    }, 0)
}
