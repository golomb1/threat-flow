/**
 * Flattens a list of lists, inserting a separator item between each original list.
 *
 * @param listOfLists - An array containing subarrays
 * @param separator - The item to insert between flattened arrays
 * @returns A flattened array with separators between original subarrays
 *
 * @example
 * ```typescript
 * flattenWithSeparator([[1, 2], [3, 4], [5]], '|')
 * // Returns: [1, 2, '|', 3, 4, '|', 5]
 *
 * flattenWithSeparator([['a', 'b'], ['c'], ['d', 'e']], null)
 * // Returns: ['a', 'b', null, 'c', null, 'd', 'e']
 *
 * flattenWithSeparator([[1], [2], [3]], 0)
 * // Returns: [1, 0, 2, 0, 3]
 * ```
 */
export function flattenWithSeparator<T, S>(listOfLists: T[][], separator: S): (T | S)[] {
  if (!listOfLists || listOfLists.length === 0) {
    return [];
  }

  return listOfLists.flatMap((sublist, index) =>
    index < listOfLists.length - 1
      ? [...sublist, separator]
      : sublist
  );
}