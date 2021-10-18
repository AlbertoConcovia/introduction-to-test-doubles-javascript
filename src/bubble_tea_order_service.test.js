/* eslint-disable no-undef */
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


// const add = (a, b) => a + b;
// const cases = [[2, 2, 4], [-2, -2, -4], [2, -2, 0]];
// describe('Test.each - bubble_tea_order_service', () => {
//   test.each(cases)(
//       'given %p and %p as arguments, returns %p',
//       (firstArg, secondArg, expectedResult) => {
//         const result = add(firstArg, secondArg);
//         expect(result).toEqual(expectedResult);
//       },
//   );
// });

const casesTeaType = [
  'OOLONGMILKTEA',
  'JASMINEMILKTEA',
  'MATCHAMILKTEA',
  'PEACHICETEA',
  'LYCHEEICETEA',
];

describe('Test.each successful bubble_tea_order_service', () => {
  test.each(casesTeaType)(
      `Given ${casesTeaType} type validation - then ${casesTeaType}`, () => {
        // Arrange
        const bubbleTeaRequest = {
          'paymentDetails': dummyPaymentDetails,
          'bubbleTea': {
            'type': casesTeaType,
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
});
