export enum Operation {
  ADDITION = 0,
  SUBTRACTION = 1,
  DIVISION = 2,
  MULTIPLICATION = 3,
}

export interface Formula {
  operation: Operation;
  numbers: Array<number | Formula[]>;
}

export function calculate(formulas: Formula[], result = 0): number {
  const sorted = formulas.sort((a, b) => b.operation - a.operation);

  sorted.forEach((formula) => {
    result = calculateFormula(formula.numbers, formula.operation, result);
    console.log(result);
  });

  return result;
}

function calculateFormula(
  numbers: Array<number | Formula[]>,
  operation: Operation,
  result: number
): number {
  if (numbers.every((number) => typeof number === "number")) {
    result = solveFormula(numbers as number[], operation, result);
  } else {
    const simplifiedOperations = numbers.map((number) => {
      if (typeof number === "number") return number;
      return calculate(number);
    });

    result = calculateFormula(simplifiedOperations, operation, result);
  }

  return result;
}

function solveFormula(
  numbers: number[],
  operation: Operation,
  result: number
): number {
  result += solve(numbers, operation);
  return result;
}

function solve(numbers: number[], operation: Operation): number {
  let result = operation === Operation.SUBTRACTION ? -numbers[0] : numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (operation === Operation.DIVISION) {
      result /= numbers[i];
    } else if (operation === Operation.MULTIPLICATION) {
      result *= numbers[i];
    } else if (operation === Operation.ADDITION) {
      result += numbers[i];
    } else if (operation === Operation.SUBTRACTION) {
      result -= numbers[i];
    }
  }
  return result;
}

const expected = 2 - 4 / 3 - 5 - 7 + (2 * 20) / 2;
const actual = calculate([
  {
    operation: Operation.ADDITION,
    numbers: [
      2,
      [
        {
          operation: Operation.DIVISION,
          numbers: [-4, 3],
        },
        {
          operation: Operation.SUBTRACTION,
          numbers: [5, 7],
        },
        {
          operation: Operation.MULTIPLICATION,
          numbers: [
            2,
            [
              {
                operation: Operation.DIVISION,
                numbers: [20, 2],
              },
            ],
          ],
        },
      ],
    ],
  },
]);

console.log(expected === actual, expected, actual);
