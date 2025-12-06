import {isInvalidId} from "./analyse.js";

const testCases = [
    // Too short
    { id: 1, expected: false },
    // Valid ID
    { id: 12, expected: false },
    // Some repeats but not all
    { id: 123123122, expected: false },

    // 1 digit pattern
    { id: 11111, expected: true },
    // 2 digit pattern
    { id: 121212, expected: true },
    // 3 digit pattern
    { id: 123123, expected: true },
];

testCases.forEach((testCase) => {
    if (isInvalidId(testCase.id) !== testCase.expected) {
        console.error("[FAIL]", testCase);
    }
})