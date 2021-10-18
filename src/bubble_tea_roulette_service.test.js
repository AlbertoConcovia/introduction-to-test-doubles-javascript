/* eslint-disable linebreak-style */
const getRandomBubbleTeaType = require('./bubble_tea_roulette_service');

test('should generate random bubble tea', () => {
  // Arrange
  // Stub to calls to Math.random to return 0.2
  jest.spyOn(global.Math, 'random').mockReturnValue(0.2);

  // Act
  const bubbleTea = getRandomBubbleTeaType();

  // Assert
  expect(bubbleTea).toBe('JASMINEMILKTEA');

  // Restore the default Math.random
  jest.spyOn(global.Math, 'random').mockRestore();
});

test('Given random number is 0.4 Then MATCHAMILKTEA', () => {
  // Arrange
  jest.spyOn(global.Math, 'random').mockReturnValue(0.4);

  // Act
  const bubbleTea = getRandomBubbleTeaType();

  // Assert
  expect(bubbleTea).toBe('MATCHAMILKTEA');

  // Restore the default Math.random
  jest.spyOn(global.Math, 'random').mockRestore();
});