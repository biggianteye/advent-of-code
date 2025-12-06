import {calculate} from "./calculate.js";

const testCases = [
    {
        lines: ["R1"],
        a: 0,
        b: 0,
    },
    {
        lines: ["R49"],
        a: 0,
        b: 0,
    },
    {
        lines: ["R50"],
        a: 1,
        b: 1,
    },
    {
        lines: ["R51"],
        a: 0,
        b: 1,
    },
    {
        lines: ["R251"],
        a: 0,
        b: 3,
    },
    {
        lines: ["L1"],
        a: 0,
        b: 0,
    },
    {
        lines: ["L49"],
        a: 0,
        b: 0,
    },
    {
        lines: ["L50"],
        a: 1,
        b: 1,
    },
    {
        lines: ["L51"],
        a: 0,
        b: 1,
    },
    {
        lines: ["L251"],
        a: 0,
        b: 3,
    },
    // Start from zero
    {
        lines: ["R50", "L1"],
        a: 1,
        b: 1,
    },
    {
        lines: ["R50", "R1"],
        a: 1,
        b: 1,
    },
    {
        lines: ["R50", "L101"],
        a: 1,
        b: 2,
    },
    {
        lines: ["R50", "R101"],
        a: 1,
        b: 2,
    },
    // Start from zero and return to zero
    {
        lines: ["R50", "L1", "R1"],
        a: 2,
        b: 2,
    },
    {
        lines: ["R50", "R1", "L1"],
        a: 2,
        b: 2,
    },
    {
        lines: ["R50", "L101", "R101"],
        a: 2,
        b: 4,
    },
    {
        lines: ["R50", "R101", "L101"],
        a: 2,
        b: 4,
    },
];

testCases.forEach((testCase) => {
    const result = calculate(testCase.lines);
    if (result.zeroCountA !== testCase.a || result.zeroCountB !== testCase.b) {
        console.error("[FAIL]", testCase, result);
    } else {
        console.log("[PASS]", testCase);
    }
})