/**
 * returns true if at least one of the arguments is defined
 * @param {any[]} args
 * @returns {boolean} whether exactly one argument is defined
 */
export const atLeastOneArgExists = (...args: any[]): boolean =>
  args.slice().filter(Boolean).length >= 1;

/**
 * returns true if zero or one of the arguments are defined
 * @param {any[]} args
 * @returns {boolean} whether zero or one of the arguments are defined
 */
export const maxOneArgExists = (...args: any[]): boolean =>
  args.slice().filter(Boolean).length <= 1;
