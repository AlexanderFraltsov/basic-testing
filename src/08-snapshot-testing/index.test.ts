import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
		const value = 1;
		expect(generateLinkedList([value])).toStrictEqual({ value, next: { value: null, next: null } });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const value1 = 1; const value2 = 2;
		expect(generateLinkedList([value1, value2])).toMatchSnapshot();
  });
});
