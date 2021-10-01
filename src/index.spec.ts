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

  it("should handle instant depreciation", () => {
    expect(calculateDepreciation({
      purchaseAmount: 2000000,
      purchaseDate: new Date("2016-05-01"),
      totalDepreciationYears: 0,
    })).toEqual([{
      year: 2016,
      depreciationMonths: 0,
      depreciationAmount: 2000000,
      percentage: 1,
      startAmount: 2000000,
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

  it("should not return endAmount of 1 for small amount like 31", () => {
    expect(calculateDepreciation({
      purchaseAmount: 31,
      purchaseDate: new Date("2018-01-01"),
      totalDepreciationYears: 3,
    })).toEqual([{
      year: 2018,
      depreciationMonths: 12,
      depreciationAmount: 10,
      percentage: 0.3225806451612903,
      startAmount: 31,
      endAmount: 21,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 10,
      percentage: 0.3225806451612903,
      startAmount: 21,
      endAmount: 11,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 11,
      percentage: 0.3548387096774194,
      startAmount: 11,
      endAmount: 0,
    }])
  });

  it("should not return endAmount of 1 for small amount like 31 - purchase made after Jan", () => {
    expect(calculateDepreciation({
      purchaseAmount: 31,
      purchaseDate: new Date("2018-02-01"),
      totalDepreciationYears: 3,
    })).toEqual([{
      year: 2018,
      depreciationMonths: 11,
      depreciationAmount: 9,
      percentage: 0.2903225806451613,
      startAmount: 31,
      endAmount: 22,
    }, {
      year: 2019,
      depreciationMonths: 12,
      depreciationAmount: 10,
      percentage: 0.3225806451612903,
      startAmount: 22,
      endAmount: 12,
    }, {
      year: 2020,
      depreciationMonths: 12,
      depreciationAmount: 10,
      percentage: 0.3225806451612903,
      startAmount: 12,
      endAmount: 2,
    },
    {
      year: 2021,
      depreciationMonths: 1,
      depreciationAmount: 2,
      percentage: 0.06451612903225806,
      startAmount: 2,
      endAmount: 0,
    }])
  });


  it("should not return endAmount of -1", () => {
    expect(calculateDepreciation({
      purchaseAmount: 199900,
      purchaseDate: new Date("2020-04-15"),
      totalDepreciationYears: 2,
    })).toEqual([
      {
        year: 2020,
        depreciationMonths: 9,
        depreciationAmount: 74963,
        percentage: 0.3750025012506253,
        startAmount: 199900,
        endAmount: 124937
      },
      {
        year: 2021,
        depreciationMonths: 12,
        depreciationAmount: 99950,
        percentage: 0.5,
        startAmount: 124937,
        endAmount: 24987
      },
      {
        year: 2022,
        depreciationMonths: 3,
        depreciationAmount: 24987,
        percentage: 0.12499749874937469,
        startAmount: 24987,
        endAmount: 0
      }
    ]);
  });

  it("should not return endAmount of 3", () => {
    expect(calculateDepreciation({
      purchaseAmount: 123000,
      purchaseDate: new Date("2021-09-29"),
      totalDepreciationYears: 7,
    })).toEqual([
      {
        year: 2021,
        depreciationMonths: 4,
        depreciationAmount: 5857,
        percentage: 0.04761788617886179,
        startAmount: 123000,
        endAmount: 117143
      },
      {
        year: 2022,
        depreciationMonths: 12,
        depreciationAmount: 17571,
        percentage: 0.14285365853658535,
        startAmount: 117143,
        endAmount: 99572
      },
      {
        year: 2023,
        depreciationMonths: 12,
        depreciationAmount: 17571,
        percentage: 0.14285365853658535,
        startAmount: 99572,
        endAmount: 82001
      },
      {
        year: 2024,
        depreciationMonths: 12,
        depreciationAmount: 17571,
        percentage: 0.14285365853658535,
        startAmount: 82001,
        endAmount: 64430
      },
      {
        year: 2025,
        depreciationMonths: 12,
        depreciationAmount: 17571,
        percentage: 0.14285365853658535,
        startAmount: 64430,
        endAmount: 46859
      },
      {
        year: 2026,
        depreciationMonths: 12,
        depreciationAmount: 17571,
        percentage: 0.14285365853658535,
        startAmount: 46859,
        endAmount: 29288
      },
      {
        year: 2027,
        depreciationMonths: 12,
        depreciationAmount: 17571,
        percentage: 0.14285365853658535,
        startAmount: 29288,
        endAmount: 11717
      },
      {
        year: 2028,
        depreciationMonths: 8,
        depreciationAmount: 11717,
        percentage: 0.09526016260162602,
        startAmount: 11717,
        endAmount: 0
      }
    ]);
  });

  it("should not return endAmount of 2", () => {
    expect(calculateDepreciation({
      purchaseAmount: 1230000,
      purchaseDate: new Date("2021-09-29"),
      totalDepreciationYears: 7,
    })).toEqual([
      {
        year: 2021,
        depreciationMonths: 4,
        depreciationAmount: 58571,
        percentage: 0.04761869918699187,
        startAmount: 1230000,
        endAmount: 1171429
      },
      {
        year: 2022,
        depreciationMonths: 12,
        depreciationAmount: 175714,
        percentage: 0.14285691056910568,
        startAmount: 1171429,
        endAmount: 995715
      },
      {
        year: 2023,
        depreciationMonths: 12,
        depreciationAmount: 175714,
        percentage: 0.14285691056910568,
        startAmount: 995715,
        endAmount: 820001
      },
      {
        year: 2024,
        depreciationMonths: 12,
        depreciationAmount: 175714,
        percentage: 0.14285691056910568,
        startAmount: 820001,
        endAmount: 644287
      },
      {
        year: 2025,
        depreciationMonths: 12,
        depreciationAmount: 175714,
        percentage: 0.14285691056910568,
        startAmount: 644287,
        endAmount: 468573
      },
      {
        year: 2026,
        depreciationMonths: 12,
        depreciationAmount: 175714,
        percentage: 0.14285691056910568,
        startAmount: 468573,
        endAmount: 292859
      },
      {
        year: 2027,
        depreciationMonths: 12,
        depreciationAmount: 175714,
        percentage: 0.14285691056910568,
        startAmount: 292859,
        endAmount: 117145
      },
      {
        year: 2028,
        depreciationMonths: 8,
        depreciationAmount: 117145,
        percentage: 0.09523983739837398,
        startAmount: 117145,
        endAmount: 0
      }
    ]);
  });

  it("should not return endAmount of 5", () => {
    expect(calculateDepreciation({
      purchaseAmount: 1230000,
      purchaseDate: new Date("2021-09-29"),
      totalDepreciationYears: 13,
    })).toEqual([
      {
        year: 2021,
        depreciationMonths: 4,
        depreciationAmount: 31538,
        percentage: 0.025640650406504064,
        startAmount: 1230000,
        endAmount: 1198462
      },
      {
        year: 2022,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 1198462,
        endAmount: 1103847
      },
      {
        year: 2023,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 1103847,
        endAmount: 1009232
      },
      {
        year: 2024,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 1009232,
        endAmount: 914617
      },
      {
        year: 2025,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 914617,
        endAmount: 820002
      },
      {
        year: 2026,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 820002,
        endAmount: 725387
      },
      {
        year: 2027,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 725387,
        endAmount: 630772
      },
      {
        year: 2028,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 630772,
        endAmount: 536157
      },
      {
        year: 2029,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 536157,
        endAmount: 441542
      },
      {
        year: 2030,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 441542,
        endAmount: 346927
      },
      {
        year: 2031,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 346927,
        endAmount: 252312
      },
      {
        year: 2032,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 252312,
        endAmount: 157697
      },
      {
        year: 2033,
        depreciationMonths: 12,
        depreciationAmount: 94615,
        percentage: 0.07692276422764227,
        startAmount: 157697,
        endAmount: 63082
      },
      {
        year: 2034,
        depreciationMonths: 8,
        depreciationAmount: 63082,
        percentage: 0.05128617886178862,
        startAmount: 63082,
        endAmount: 0
      }
    ]);
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
      totalDepreciationYears: -1,
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
