import expect from "expect";

import calculateDepreciation, { toFixedTwo } from ".";

describe("calculateDepreciation()", () => {
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
      startAmount: 20000,
      endAmount: 16000,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 16000,
      endAmount: 12000,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 12000,
      endAmount: 8000,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 8000,
      endAmount: 4000,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 4000,
      endAmount: 0,
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
      startAmount: 20000,
      endAmount: 19666.67,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 19666.67,
      endAmount: 15666.67,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 15666.67,
      endAmount: 11666.67,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 11666.67,
      endAmount: 7666.67,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 7666.67,
      endAmount: 3666.67,
    }, {
      year: 2021,
      depreciationMonths: 11,
      depreciationAmount: 3666.67,
      percentage: 18.33,
      startAmount: 3666.67,
      endAmount: 0,
    }])
  });

  it("should handle any month, besides January or December", () => {
    expect(calculateDepreciation({
      purchaseAmount: 20000,
      purchaseDate: new Date("2016-08-01"),
      totalDepreciationYears: 5,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 5,
      depreciationAmount: 1666.67,
      percentage: 8.33,
      startAmount: 20000,
      endAmount: 18333.33,
    }, {
      year: 2017,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 18333.33,
      endAmount: 14333.33,
    }, {
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 14333.33,
      endAmount: 10333.33,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 10333.33,
      endAmount: 6333.33,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 4000,
      percentage: 20,
      startAmount: 6333.33,
      endAmount: 2333.33,
    }, {
      year: 2021,
      depreciationMonths: 7,
      depreciationAmount: 2333.33,
      percentage: 11.67,
      startAmount: 2333.33,
      endAmount: 0,
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
      startAmount: 20000,
      endAmount: 0,
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
      startAmount: 20000,
      endAmount: 6666.67,
    }, {
      year: 2017,
      depreciationMonths: 4,
      depreciationAmount: 6666.67,
      percentage: 33.33,
      startAmount: 6666.67,
      endAmount: 0,
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
      startAmount: 799,
      endAmount: 0,
    }])
  });

  it("should not return endAmount of 0.01", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2500,
      purchaseDate: new Date("2018-02-01"),
      totalDepreciationYears: 3,
    })).toEqual([{
      year: 2018,
      depreciationMonths: 11,
      depreciationAmount: 763.89,
      percentage: 30.56,
      startAmount: 2500,
      endAmount: 1736.11,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 833.33,
      percentage: 33.33,
      startAmount: 1736.11,
      endAmount: 902.78,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 833.33,
      percentage: 33.33,
      startAmount: 902.78,
      endAmount: 69.45,
    }, {
      year: 2021,
      depreciationMonths: 1,
      depreciationAmount: 69.45,
      percentage: 2.78,
      startAmount: 69.45,
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
      purchaseAmount: 20000,
      purchaseDate: new Date("invalid-date"),
      totalDepreciationYears: 1,
    })).toThrow({
      name: 'TypeError',
      message: '`purchaseDate` is invalid.'
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
});

describe("toFixedTwo()", () => {
  it("should convert correctly", () => {
    expect(toFixedTwo(1)).toEqual(1);
    expect(toFixedTwo(1.1)).toEqual(1.1);
    expect(toFixedTwo(1.9)).toEqual(1.9);
    expect(toFixedTwo(1.004)).toEqual(1);
    expect(toFixedTwo(1.005)).toEqual(1.01);
    expect(toFixedTwo(1.11111)).toEqual(1.11);
    expect(toFixedTwo(1.2222)).toEqual(1.22);
    expect(toFixedTwo(1.5555)).toEqual(1.56);
    expect(toFixedTwo(1.8888)).toEqual(1.89);
    expect(toFixedTwo(1.9999)).toEqual(2);
  });
});
