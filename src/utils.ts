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

/**
 *
 *  Check if value is string or an array of strings. In case value isn't
 *  a string or an array of strings, it throws an Error.
 *
 *  This function is meant to be used with the express-validator library.
 *
 * @param value - The value to be checked
 * @param valueName - The name of the value to be displayed in the error message
 * @returns - True if values is a string or an array of strings, Error otherwise
 */
export const isStringOrArrayOfStrings = (value, valueName: string) => {
  if (
    (typeof value === "string" && value.trim() !== "") ||
    (Array.isArray(value) &&
      value.every((item) => typeof item === "string" && item.trim() !== ""))
  ) {
    return true;
  }
  throw new Error(
    valueName + " must be a non-empty string or an array of non-empty strings"
  );
};

/**
 *
 * Return a string with a list of messages provided by the error.
 *
 * This function is meant to be used when trying to catch errors produced by sequelize when
 * trying to interact with the database.
 *
 * @param error - The error element given when trying to interact with the database with sequelize
 * @returns - A string that contains all the error messages given by the error
 */
export const getErrorMessages = (error) => {
  let message: string = "";
  let lineEnd: string = ",  ";
  error.errors.forEach((element) => {
    message += element.message + ": " + element.value + lineEnd;
  });

  message = message.substring(0, message.length - lineEnd.length);

  return message;
};
