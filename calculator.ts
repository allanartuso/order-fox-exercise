enum Operator {
  SUM = 0,
  MINUS = 1,
  DIVISION = 2,
  MULTIPLICATION = 3,
}

interface Operation {
  operator: Operator;
  numbers: number[];
}

function calculator(operations: Operation[]) {
  let result = 0;

  operations
    .sort((a, b) => b.operator - a.operator)
    .forEach((operation) => {
        if (operation.operator === Operator.DIVISION) {
            result += solveDivision(operation.numbers);
          } else if (operation.operator === Operator.MULTIPLICATION) {
            result += solveDivision(operation.numbers);
          } else {
        operation.numbers.forEach((number) => {
          if (operation.operator === Operator.SUM) {
            result += number;
          } else if (operation.operator === Operator.MINUS) {
            result -= number;
          }
        });
      }

      console.log(result);
    });

  return result;
}

function solveDivision(numbers: number[]): number {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = result / numbers[i];
    }
    return result;
  }

  function solveMultiplication(numbers: number[]): number {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      result = result * numbers[i];
    }
    return result;
  }

const operations: Operation[] = [
  {
    operator: Operator.SUM,
    numbers: [2],
  },
  {
    operator: Operator.DIVISION,
    numbers: [4, 3],
  },
  {
    operator: Operator.MINUS,
    numbers: [5],
  },
];

console.log(calculator(operations));
