export const joltage = (banks) => {
    return banks
        .filter((line) => line !== "")
        .reduce((acc, bank) => {
            // console.log(bank);
            // Approach:
            // - Example: 818181911112111
            // - Grab the highest number, excluding the last number. ie. 9
            // - Grab the highest number after that first one. ie. 2
            const batteries = bank.split("");
            const firstBatteryValue = Math.max(...batteries.slice(0, batteries.length-1));
            const firstBatteryIndex = bank.indexOf(firstBatteryValue);
            const secondBatteryValue = Math.max(...batteries.slice(firstBatteryIndex+1));
            return acc + firstBatteryValue * 10 + secondBatteryValue;
    }, 0)
}