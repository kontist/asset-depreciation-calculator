import expect from "expect";

import calculateDepreciation from ".";

describe("calculateDepreciation()", () => {
  it("should handle other months", () => {
    expect(calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-08-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 5,
      depreciationAmount: 1666.67,
      percentage: 8.33,
      startValue: 20000,
      endValue: 18333.33,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 18333.33,
      endValue: 14333.33,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 14333.33,
      endValue: 10333.33,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 10333.33,
      endValue: 6333.33,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 6333.33,
      endValue: 2333.33,
    }, {
      year: 2021,
      depreciationMonths: 7,
      depreciationAmount: 2333.33,
      percentage: 11.67,
      startValue: 2333.33,
      endValue: 0,
    }])
  });

  it("should handle January", () => {
    expect(calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 20000,
      endValue: 16000,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 16000,
      endValue: 12000,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 12000,
      endValue: 8000,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 8000,
      endValue: 4000,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 4000,
      endValue: 0,
    }])
  });

  it("should handle December", () => {
    expect(calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-12-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 1,
      depreciationAmount: 333.33,
      percentage: 1.67,
      startValue: 20000,
      endValue: 19666.67,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 19666.67,
      endValue: 15666.67,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 15666.67,
      endValue: 11666.67,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 11666.67,
      endValue: 7666.67,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startValue: 7666.67,
      endValue: 3666.67,
    }, {
      year: 2021,
      depreciationMonths: 11,
      depreciationAmount: 3666.67,
      percentage: 18.33,
      startValue: 3666.67,
      endValue: 0,
    }])
  });

  it("should handle one year depreciation - purchase made in Jan", () => {
    expect(calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 1,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 12,
      depreciationAmount: 20000,
      percentage: 100,
      startValue: 20000,
      endValue: 0,
    }])
  });

  it("should handle one year depreciation - purchase made after Jan", () => {
    expect(calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-05-01"),
      totalDepreciationYears: 1,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 8,
      depreciationAmount: 13333.33,
      percentage: 66.67,
      startValue: 20000,
      endValue: 6666.67,
    }, {
      year: 2017,
      depreciationMonths: 4,
      depreciationAmount: 6666.67,
      percentage: 33.33,
      startValue: 6666.67,
      endValue: 0,
    }])
  });

  it("should handle the case where good's value is less than 800", () => {
    expect(calculateDepreciation({
      purchaseAmount: 799,
      purchaseDate: new Date("2016-05-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 8,
      depreciationAmount: 799,
      percentage: 100,
      startValue: 799,
      endValue: 0,
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

  it("should throw error if totalDepreciationYears is incorrect", () => {
    expect(() => calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-01-01"),
      totalDepreciationYears: 0,
    })).toThrow({
      name: 'TypeError',
      message: '`totalDepreciationYears` is invalid.'
    });
  });
})
