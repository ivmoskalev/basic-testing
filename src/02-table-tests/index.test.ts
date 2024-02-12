// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  // Test cases for addition
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: -1, b: 2, action: Action.Add, expected: 1 },
  { a: 0, b: 0, action: Action.Add, expected: 0 },

  // Test cases for subtraction
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: -1, b: -2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 5, action: Action.Subtract, expected: -5 },

  // Test cases for multiplication
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
  { a: 5, b: 0, action: Action.Multiply, expected: 0 },

  // Test cases for division
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: -6, b: 3, action: Action.Divide, expected: -2 },
  { a: 10, b: -2, action: Action.Divide, expected: -5 },

  // Test cases for exponentiation
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should correctly $action two numbers',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 3, action: null })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '5', b: 3, action: Action.Add })).toBeNull();
  });
});
