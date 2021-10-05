import { calculate, Operation } from "./calculator";

describe("calculator", () => {
  it("", () => {
    const expected = 2 - 4 / 3 - 5 - 7 + (2 * 20) / 2;

    const actual = calculate([
      {
        operation: Operation.ADDITION,
        params: [
          2,
          [
            {
              operation: Operation.DIVISION,
              params: [-4, 3],
            },
            {
              operation: Operation.SUBTRACTION,
              params: [5, 7],
            },
            {
              operation: Operation.MULTIPLICATION,
              params: [
                2,
                [
                  {
                    operation: Operation.DIVISION,
                    params: [20, 2],
                  },
                ],
              ],
            },
          ],
        ],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = (2 / 4) * 7;

    const actual = calculate([
      {
        operation: Operation.MULTIPLICATION,
        params: [
          7,
          [
            {
              operation: Operation.DIVISION,
              params: [2, 4],
            },
          ],
        ],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = 5 - 7;

    const actual = calculate([
      {
        operation: Operation.ADDITION,
        params: [5],
      },
      {
        operation: Operation.SUBTRACTION,
        params: [7],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = -5 - 7;

    const actual = calculate([
      {
        operation: Operation.SUBTRACTION,
        params: [5, 7],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = 5 + 7;

    const actual = calculate([
      {
        operation: Operation.ADDITION,
        params: [5, 7],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = 5 / 7;

    const actual = calculate([
      {
        operation: Operation.DIVISION,
        params: [5, 7],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = 5 * 7;

    const actual = calculate([
      {
        operation: Operation.MULTIPLICATION,
        params: [5, 7],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = -5 * 7;

    const actual = calculate([
      {
        operation: Operation.SUBTRACTION,
        params: [
          [
            {
              operation: Operation.MULTIPLICATION,
              params: [5, 7],
            },
          ],
        ],
      },
    ]);

    expect(actual).toEqual(expected);
  });

  it("", () => {
    const expected = 5 + (2 * 7 + 2) * (10 / 5 - 3) - 2;

    const actual = calculate([
      {
        operation: Operation.ADDITION,
        params: [5],
      },
      {
        operation: Operation.MULTIPLICATION,
        params: [
          [
            {
              operation: Operation.MULTIPLICATION,
              params: [2, 7],
            },
            {
              operation: Operation.ADDITION,
              params: [2],
            },
          ],
          [
            {
              operation: Operation.SUBTRACTION,
              params: [3],
            },
            {
              operation: Operation.DIVISION,
              params: [10, 5],
            },
          ],
        ],
      },
      {
        operation: Operation.SUBTRACTION,
        params: [2],
      },
    ]);

    expect(actual).toEqual(expected);
  });
});
