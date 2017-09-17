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

/**
 *
 * @param array
 * @param properties
 * @param values
 * @returns {array}
 *
 * Rename properties of object in array
 */
export const changePropretiesOfObjectInArray = (array, properties, values) => {
  array.forEach((o) => {
    Object.keys(o).forEach((key) => {
      const titi = properties.indexOf(key);
      if (titi > -1) {
        const pos = values[titi];
        o[pos] = o[key];
        delete o[key];
      }
    });
  });
  return array;
};
