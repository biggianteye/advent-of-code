export const analyse = (ranges) => {
    const invalid = [];
    ranges.forEach((range) => {
        if (!range) {
            return;
        }

        const [start, end] = range.split("-");

        for (let i = Number(start); i<=Number(end); i++) {
            const str = String(i);
            if (str.length%2 === 1) {
                // console.log(`Skipping odd length value: ${str}`);
            }

            if (str.slice(0, str.length/2) === str.slice(str.length/2, str.length)) {
                console.log("Found invalid ID: ", str)
                invalid.push(i);
            }

            // console.log(str);
        }

        // console.log(start, end);
    })

    return invalid.reduce((acc, val) => acc + val, 0);
}