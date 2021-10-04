enum Operator {
  SUM=0,
  MINUS=1,
  DIVISION=2,
}

interface Operation {
  operator: Operator;
  numbers: number[];
}

function calculator(operations: Operation[]) {
  let result = 0;
const test = operations.sort((a,b)=> b.operator-a.operator)
    console.log(test);
    

test.forEach((operation) => {
    operation.numbers.forEach((number) => {
      if (operation.operator === Operator.SUM) {
        result += number;
      } else if (operation.operator === Operator.DIVISION) {
        result = result / number;
      }else if (operation.operator === Operator.MINUS) {
        result -=  number;
      }
    });

    console.log(result);
    
  });

  return result;
}

const operations: Operation[] = [
  {
    operator: Operator.SUM,
    numbers: [2],
  },
  {
    operator: Operator.DIVISION,
    numbers: [4,3],
  },
  {
    operator: Operator.MINUS,
    numbers: [5],
  },
];


2 + (4/3 - 5)

console.log(calculator(operations));
