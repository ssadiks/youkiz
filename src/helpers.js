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
 * @param properties ['_id', 'name']
 * @param values ['value', 'label']
 * @returns {array}
 *
 * Rename properties of object in array
 */
export const changePropretiesOfObjectInArray = (array, properties, values) => {
  const sliced = array && (array.map(item => ({ ...item }))).slice(0);

  if (sliced) {
    sliced.forEach((o) => {
      Object.keys(o).forEach((key) => {
        const keyIndex = properties.indexOf(key);
        if (keyIndex > -1) {
          const newKey = values[keyIndex];
          const objClone = o;
          objClone[newKey] = o[key];
          delete objClone[key];
        }
      });
    });
  }

  return sliced;
};
