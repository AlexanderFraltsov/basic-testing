import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 3, b: 5, action: Action.Add, expected: 8 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 5, b: 3, action: Action.Multiply, expected: 15 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 0, action: 'not action', expected: null },
  { a: 'one', b: 'two', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should return $expected for $a $action $b`,
    ({ a, b, action, expected }) =>
      expect(simpleCalculator({ a, b, action })).toBe(expected),
  );
});
