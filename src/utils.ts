/**
 * Checks if a given string is a comma-separated list of numbers.
 *
 * This function tests whether the input string consists of one or more
 * numeric values separated by commas. Each numeric value should be a
 * sequence of digits without any leading or trailing spaces.
 *
 * @param {string} str - The string to be tested.
 * @returns {boolean} - Returns `true` if the string is a valid comma-separated
 * list of numbers, otherwise returns `false`.
 *
 * @example
 * // returns true
 * isCsvNumbers("1,2,3,4,5");
 *
 * @example
 * // returns true
 * isCsvNumbers("42");
 *
 * @example
 * // returns false
 * isCsvNumbers("1, 2, 3"); // contains spaces
 *
 * @example
 * // returns false
 * isCsvNumbers("1,,2,3"); // contains consecutive commas
 *
 * @example
 * // returns false
 * isCsvNumbers("1,a,3"); // contains non-numeric characters
 */
export const isCsvNumbers = (str: string): boolean => {
  return /^(\d+)(,\d+)*$/.test(str);
};

/**
 * Returns an array that contains the splitted values from str if it's a comma-separated list of numbers.
 *
 * If str is not a comma-separated list of numbers, this function will return a single element array that contains str.
 *
 * @param {string} str - The string to be splitted
 * @returns {Array<string>} - The array that that contains the splitted values from str
 *
 * @example
 * //returns ["1","2","3","4"]
 * getArrayFromCSV("1,2,3,4");
 *
 * @example
 * //returns ["12"]
 * getArrayFromCSV("12");
 *
 * @example
 * //returns ["1,,2,3"]
 * getArrayFromCSV("1,,2,3"); // contains consecutive commas
 *
 * @example
 * getArrayFromCSV("1,a,3"); // contains non-numeric characters
 */
export const getArrayFromCSV = (str: string): string[] => {
  let arr: Array<string> = [];

  if (isCsvNumbers(str)) arr = str.split(",");
  else arr = [str];

  return arr;
};
