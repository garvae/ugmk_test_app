/**
 * Checks that the data is an array and this array is not empty
 */
export const isArrayAndNotEmpty = (arr?: unknown): arr is unknown[] => !!arr && Array.isArray(arr) && !!arr.length;
