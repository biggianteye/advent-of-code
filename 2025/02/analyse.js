const factors = [
    // Skip number that are one or fewer digits
    [],
    [],
    // 2 digits and onwards can be checked
    [1],
    [1],
    [1, 2],
    // 5 digits
    [1],
    [1, 2, 3],
    [1],
    [1, 2, 4],
    [1, 3],
    // 10 digits
    [1, 2, 5],
    [1],
    [1, 2, 3, 4, 6],
];

export const isInvalidId = (id) => {
    const str = String(id);

    if (str.length < 2) {
        return false;
    }

    if(!factors[str.length]) {
        console.log(`[SKIP] No data for length ${str.length}`);
        return false;
    }

    // Rather than trying to split the original string and check for matching patterns, invert it instead.
    // ie. see if a repeated pattern made from a smaller part matches the whole string.
    // eg. does 3 x "12" match "121212"
    for (const factor of factors[str.length]) {
        const numParts = str.length/factor;
        const part = str.slice(0, factor);
        if (part.repeat(numParts) === str) {
            return true;
        }
    }

    return false;
}

export const analyse = (ranges) => {
    const invalid = [];
    ranges.forEach((range) => {
        if (!range) {
            return;
        }

        const [start, end] = range.split("-");

        for (let i = Number(start); i<=Number(end); i++) {
            if (isInvalidId(i)) {
                invalid.push(i);
            }
        }
    })

    return invalid.reduce((acc, val) => acc + val, 0);
}