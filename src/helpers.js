/**
 *
 * @param arr (Array)
 * @param property (String)
 *
 * Get Array of Value From Array of object
 */
export const getArrayOfValue = (arr = [], property = '') => arr.map(a => a[property]);

/**
 *
 * @param arr (Array)
 * @param property (String)
 * @param value (String)
 */
export const filterArrayBy = (arr = [], property = '', value = '') => arr.filter(item => item[property] === value);
