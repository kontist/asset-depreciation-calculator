import expect from "expect";

import calculateDepreciation, {
  assertPurchaseAmount,
  assertPurchaseDate,
  assertDepreciationYears,
} from ".";

describe("calculateDepreciation()", () => {
  it("should handle January", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 2000000,
      endAmount: 1600000,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1600000,
      endAmount: 1200000,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1200000,
      endAmount: 800000,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 800000,
      endAmount: 400000,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 400000,
      endAmount: 0,
    }])
  });

  it("should handle December", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-12-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 1,
      depreciationAmount: 33333,
      percentage: 0.0166665,
      startAmount: 2000000,
      endAmount: 1966667,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1966667,
      endAmount: 1566667,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1566667,
      endAmount: 1166667,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1166667,
      endAmount: 766667,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 766667,
      endAmount: 366667,
    }, {
      year: 2021,
      depreciationMonths: 11,
      depreciationAmount: 366667,
      percentage: 0.1833335,
      startAmount: 366667,
      endAmount: 0,
    }])
  });

  it("should handle any month, besides January or December", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-08-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 5,
      depreciationAmount: 166667,
      percentage: 0.0833335,
      startAmount: 2000000,
      endAmount: 1833333,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1833333,
      endAmount: 1433333,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1433333,
      endAmount: 1033333,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 1033333,
      endAmount: 633333,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 400000,
      percentage: 0.2,
      startAmount: 633333,
      endAmount: 233333,
    }, {
      year: 2021,
      depreciationMonths: 7,
      depreciationAmount: 233333,
      percentage: 0.1166665,
      startAmount: 233333,
      endAmount: 0,
    }])
  });

  it("should handle one year depreciation - purchase made in Jan", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 1,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 12,
      depreciationAmount: 2000000,
      percentage: 1,
      startAmount: 2000000,
      endAmount: 0,
    }])
  });

  it("should handle one year depreciation - purchase made after Jan", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-05-01"),
      totalDepreciationYears: 1,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 8,
      depreciationAmount: 1333333,
      percentage: 0.6666665,
      startAmount: 2000000,
      endAmount: 666667,
    }, {
      year: 2017,
      depreciationMonths: 4,
      depreciationAmount: 666667,
      percentage: 0.3333335,
      startAmount: 666667,
      endAmount: 0,
    }])
  });

  it("should handle the case where good's value is less than 80000 cents", () => {
    expect(calculateDepreciation({
      purchaseAmount: 79900,
      purchaseDate: new Date("2016-05-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 8,
      depreciationAmount: 79900,
      percentage: 1,
      startAmount: 79900,
      endAmount: 0,
    }])
  });

  it("should not return endAmount of 1", () => {
    expect(calculateDepreciation({
      purchaseAmount: 250000,
      purchaseDate: new Date("2018-02-01"),
      totalDepreciationYears: 3,
    })).toEqual([{
      year: 2018,
      depreciationMonths: 11,
      depreciationAmount: 76389,
      percentage: 0.305556,
      startAmount: 250000,
      endAmount: 173611,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 83333,
      percentage: 0.333332,
      startAmount: 173611,
      endAmount: 90278,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 83333,
      percentage: 0.333332,
      startAmount: 90278,
      endAmount: 6945,
    }, {
      year: 2021,
      depreciationMonths: 1,
      depreciationAmount: 6945,
      percentage: 0.02778,
      startAmount: 6945,
      endAmount: 0,
    }])
  });
});

describe("errors handler", () => {
  it("should throw error if purchaseAmount is incorrect", () => {
    expect(() => calculateDepreciation({
      purchaseAmount: -1,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 1,
    })).toThrow({
      name: 'TypeError',
      message: '`purchaseAmount` is invalid.'
    });
  });

  it("should throw error if purchaseDate is incorrect", () => {
    expect(() => calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("invalid-date"),
      totalDepreciationYears: 1,
    })).toThrow({
      name: 'TypeError',
      message: '`purchaseDate` is invalid.'
    });
  });

  it("should throw error if totalDepreciationYears is incorrect", () => {
    expect(() => calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 0,
    })).toThrow({
      name: 'TypeError',
      message: '`totalDepreciationYears` is invalid.'
    });
  });
});

describe("assertPurchaseAmount()", () => {
  it("should throw error", () => {
    expect(() => assertPurchaseAmount(-1)).toThrow({
      name: 'TypeError',
      message: '`purchaseAmount` is invalid.'
    });

    expect(() => assertPurchaseAmount(Number("1,5"))).toThrow({
      name: 'TypeError',
      message: '`purchaseAmount` is invalid.'
    });

    expect(() => assertPurchaseAmount(1.5)).toThrow({
      name: 'TypeError',
      message: '`purchaseAmount` is invalid.'
    });
  });
});

describe("assertPurchaseDate()", () => {
  it("should throw error", () => {
    expect(() => assertPurchaseDate(new Date("invalid-date"))).toThrow({
      name: 'TypeError',
      message: '`purchaseDate` is invalid.'
    });
  });
});

describe("assertDepreciationYears()", () => {
  it("should throw error", () => {
    expect(() => assertDepreciationYears(-1)).toThrow({
      name: 'TypeError',
      message: '`totalDepreciationYears` is invalid.'
    });

    expect(() => assertDepreciationYears(1.5)).toThrow({
      name: 'TypeError',
      message: '`totalDepreciationYears` is invalid.'
    });

    expect(() => assertDepreciationYears(Number("1,5"))).toThrow({
      name: 'TypeError',
      message: '`totalDepreciationYears` is invalid.'
    });
  });
});
