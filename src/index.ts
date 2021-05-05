
const MONTHS_IN_YEAR = 12;
const MINIMUM_PURCHASE_AMOUNT = 800;

export type DepreciationResult = {
  year: number;
  depreciationMonths: number;
  depreciationAmount: number;
  percentage: number;
  startValue: number;
  endValue: number;
}

const assertPurchaseAmount = (amount: number) => {
  if (amount < 0) {
    throw new TypeError('`purchaseAmount` is invalid.');
  }
};

const assertPurchaseDate = (dateString: string) => {
  if (isNaN(new Date(dateString).valueOf())) {
    throw new TypeError('`purchaseDate` is invalid.');
  }
};

const assertDepreciationYears = (years: number) => {
  if (years < 1) {
    throw new TypeError('`totalDepreciationYears` is invalid.');
  }
};

const toFixedTwo = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

const calculate = (
  purchaseAmount: number,
  totalDepreciationYears: number,
  previousEndValue: number,
  monthsLeft: number = MONTHS_IN_YEAR
): {
  depreciationAmount: number;
  percentage: number;
  startValue: number;
  endValue: number;
} => {
  const depreciationAmount = toFixedTwo((purchaseAmount / totalDepreciationYears / MONTHS_IN_YEAR) * monthsLeft);
  const percentage = toFixedTwo((depreciationAmount / purchaseAmount) * 100);
  const newEndValue = toFixedTwo(previousEndValue - depreciationAmount);

  return {
    depreciationAmount,
    percentage,
    startValue: previousEndValue,
    endValue: newEndValue,
  };
};

const calculateDepreciation = (
  purchaseAmount: number,
  purchaseDate: string,
  totalDepreciationYears: number,
): DepreciationResult[] => {
  assertPurchaseAmount(purchaseAmount);
  assertPurchaseDate(purchaseDate);
  assertDepreciationYears(totalDepreciationYears);

  const purchaseMonth: number = new Date(purchaseDate).getMonth() + 1;
  const purchaseYear: number = new Date(purchaseDate).getFullYear();
  const results: DepreciationResult[] = [];

  let endValue: number = purchaseAmount;
  let monthsLeftInLastYear: number = 0;

  // If the price of the good is less than MINIMUM_NET_AMOUNT, the year is set to 0 automatically.
  if (purchaseAmount < MINIMUM_PURCHASE_AMOUNT) {
    return [{
      year: purchaseYear,
      depreciationMonths: MONTHS_IN_YEAR - purchaseMonth + 1,
      depreciationAmount: purchaseAmount,
      percentage: 100,
      startValue: purchaseAmount,
      endValue: 0,
    }]
  }

  for (let index = 0; index < totalDepreciationYears; index++) {
    // Current year
    if (index === 0) {
      const monthsLeftInFirstYear = MONTHS_IN_YEAR - purchaseMonth + 1;
      const result = calculate(purchaseAmount, totalDepreciationYears, endValue, monthsLeftInFirstYear);
      results.push({
        year: purchaseYear,
        depreciationMonths: monthsLeftInFirstYear,
        ...result,
      });
      endValue = result.endValue;

      // If item is purchased in Jan, monthsLeftInLastYear is 0
      // If item is purchased in Dec, monthsLeftInLastYear is 11
      monthsLeftInLastYear = MONTHS_IN_YEAR - monthsLeftInFirstYear;
    }

    // Future years
    if (index > 0) {
      const result = calculate(purchaseAmount, totalDepreciationYears, endValue);
      results.push({
        year: purchaseYear + index,
        depreciationMonths: MONTHS_IN_YEAR,
        ...result,
      });
      endValue = result.endValue;
    }
  }

  if (monthsLeftInLastYear > 0) {
    results.push({
      year: purchaseYear + totalDepreciationYears,
      depreciationMonths: monthsLeftInLastYear,
      ...calculate(purchaseAmount, totalDepreciationYears, endValue, monthsLeftInLastYear),
    });
  }

  return results;
};

export default calculateDepreciation;
