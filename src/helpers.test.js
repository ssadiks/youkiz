import { sum, getArrayOfValue, changePropretiesOfObjectInArray, filterArrayBy } from './helpers';

/* sum test example */
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

/* getArrayOfValue */
test('getArrayOfValue', () => {
  const param = [{ id: 1, name: 'Dancer 1' }, { id: 2, name: 'Dancer 2' }];
  const output = ['Dancer 1', 'Dancer 2'];
  expect(getArrayOfValue(param, 'name')).toEqual(output);
});

test('getArrayOfValue property not exists', () => {
  const param = [{ id: 1, name: 'Dancer 1' }, { id: 2, name: 'Dancer 2' }];
  const output = [];
  expect(getArrayOfValue(param, 'propertyTest')).toEqual(output);
});

test('getArrayOfValue array undefined or null', () => {
  const param = null;
  const output = [];
  expect(getArrayOfValue(param, 'name')).toEqual(output);
});

/* filterArrayBy */
test('filterArrayBy', () => {
  const param = [{ id: 1, type: 'type1' }, { id: 2, type: 'type1' }, { id: 3, type: 'type2' }];
  const output = [{ id: 1, type: 'type1' }, { id: 2, type: 'type1' }];
  expect(filterArrayBy(param, 'type', 'type1')).toEqual(output);
});

test('filterArrayBy Param and properties doesnt exist', () => {
  const param = [];
  const output = [];
  expect(filterArrayBy(param, 'type', 'type1')).toEqual(output);
});

/* changePropretiesOfObjectInArray */
test('changePropretiesOfObjectInArray', () => {
  const param = [{ id: 1, name: 'Dancer 1' }, { id: 2, name: 'Dancer 2' }];
  const output = [{ id: 1, label: 'Dancer 1' }, { id: 2, label: 'Dancer 2' }];
  expect(changePropretiesOfObjectInArray(param, ['name'], ['label'])).toEqual(output);
});
