/* eslint-disable linebreak-style */
const {createOrderRequest} = require('./bubble_tea_order_service');
const bubbleTeaType = require('./bubble_tea_type');
const bubbleTeaMessenger = require('./bubble_tea_messenger');
jest.mock('./bubble_tea_messenger');
jest.mock('./simple_logger');

let dummyPaymentDetails;

beforeEach(() => {
  dummyPaymentDetails = {
    name: 'Some person',
    address: '123 Some Street',
    debitCard: {
      digits: '123456',
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test('test successful bubble tea order request', () => {
  // Arrange
  const bubbleTeaRequest = {
    paymentDetails: dummyPaymentDetails,
    bubbleTea: {
      type: bubbleTeaType.MATCHAMILKTEA,
    },
  };

  // Act
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  // Assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail,
  ).toHaveBeenCalledWith(orderRequest);
  expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail,
  ).toHaveBeenCalledTimes(1);
});


test('test successful bubble tea order request - type validation', () => {
  // Arrange
  const bubbleTeaRequest = {
    'paymentDetails': dummyPaymentDetails,
    'bubbleTea': {
      'type': bubbleTeaType.OOLONGMILKTEA,
    },
  };

  // Act
  const orderRequest = createOrderRequest(bubbleTeaRequest);

  // Assert
  expect(orderRequest.name).toBe(dummyPaymentDetails.name);
  expect(orderRequest.digits).toBe(dummyPaymentDetails.debitCard.digits);
  expect(orderRequest.type).toBe(bubbleTeaRequest.bubbleTea.type);
  expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail,
  ).toHaveBeenCalledWith(orderRequest);
  expect(
      bubbleTeaMessenger.sendBubbleTeaOrderRequestEmail,
  ).toHaveBeenCalledTimes(1);
});
