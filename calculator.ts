export enum Operator {
  SUM = 0,
  MINUS = 1,
  DIVISION = 2,
  MULTIPLICATION = 3,
}

export interface Operation {
  operator: Operator;
  operation: Array<number | Operation[]>;
}

export function calculator(operations: Operation[], result = 0) {
  const sortedOperations = operations.sort((a, b) => b.operator - a.operator);

  sortedOperations.forEach((operation) => {
    result = calculator2(operation.operation, operation.operator, result);
    console.log(result);
  });

  return result;
}

function calculator2(
  operations: (number | Operation[])[],
  operator: Operator,
  result: number
) {
  if (operations.every((operation) => typeof operation === "number")) {
    result = calculator3(operations as number[], operator, result);
  } else {
    const simplifiedOperations = operations.map((operation) => {
      if (typeof operation === "number") {
        return operation;
      }
      return calculator(operation);
    });

    result = calculator2(simplifiedOperations, operator, result);
  }

  return result;
}

function calculator3(operations: number[], operator: Operator, result: number) {
  result += solve(operations, operator); // TODO: external operator
  return result;
}

function solve(numbers: number[], operator: Operator): number {
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (operator === Operator.DIVISION) {
      result /= numbers[i];
    } else if (operator === Operator.MULTIPLICATION) {
      result *= numbers[i];
    } else if (operator === Operator.SUM) {
      result += numbers[i];
    } else if (operator === Operator.MINUS) {
      result -= numbers[i];
    }
  }
  return result;
}

const expected = 2 - 4 / 3 - 5 - 7 + 2 * (9 + 2 / 2);
const actual = calculator([
  {
    operator: Operator.SUM,
    operation: [2],
  },
  {
    operator: Operator.DIVISION,
    operation: [-4, 3],
  },
  {
    operator: Operator.MINUS,
    operation: [-5, 7],
  },
  {
    operator: Operator.MULTIPLICATION,
    operation: [
      2,
      [
        {
          operator: Operator.SUM,
          operation: [
            9,
            [
              {
                operator: Operator.DIVISION,
                operation: [2, 2],
              },
            ],
          ],
        },
      ],
    ],
  },
]);

console.log(expected === actual, expected, actual);
