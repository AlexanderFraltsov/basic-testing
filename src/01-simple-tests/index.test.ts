// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Assert
    const input = {
      a: 3,
      b: 5,
      action: Action.Add,
    };
    const expected = 8;
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBe(expected);
  });

  test('should subtract two numbers', () => {
    // Assert
    const input = {
      a: 5,
      b: 3,
      action: Action.Subtract,
    };
    const expected = 2;
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBe(expected);
  });

  test('should multiply two numbers', () => {
    // Assert
    const input = {
      a: 5,
      b: 3,
      action: Action.Multiply,
    };
    const expected = 15;
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBe(expected);
  });

  test('should divide two numbers', () => {
    // Assert
    const input = {
      a: 9,
      b: 3,
      action: Action.Divide,
    };
    const expected = 3;
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    // Assert
    const input = {
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    };
    const expected = 8;
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBe(expected);
  });

  test('should return null for invalid action', () => {
    // Assert
    const input = {
      a: 2,
      b: 0,
      action: 'not action',
    };
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    // Assert
    const input = {
      a: 'one',
      b: 'two',
      action: Action.Divide,
    };
    // Act
    const result = simpleCalculator(input);
    // Arrange
    expect(result).toBeNull();
  });
});
