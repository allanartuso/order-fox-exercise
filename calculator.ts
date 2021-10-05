export enum Operation {
  ADDITION = 0,
  SUBTRACTION = 1,
  DIVISION = 2,
  MULTIPLICATION = 3,
}

export interface Formula {
  operation: Operation;
  params: Array<number | Formula[]>;
}

export function calculate(formulas: Formula[], result = 0): number {
  const sorted = formulas.sort((a, b) => b.operation - a.operation);

  sorted.forEach((formula) => {
    result = calculateFormula(formula.params, formula.operation, result);
  });

  return result;
}

function calculateFormula(
  numbers: Array<number | Formula[]>,
  operation: Operation,
  result: number
): number {
  if (numbers.every((number) => typeof number === "number")) {
    result += solveOperation(numbers as number[], operation);
  } else {
    const simplifiedOperations = numbers.map((number) => {
      if (typeof number === "number") return number;
      return calculate(number);
    });

    result = calculateFormula(simplifiedOperations, operation, result);
  }

  return result;
}

function solveOperation(numbers: number[], operation: Operation): number {
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
