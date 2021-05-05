
const MONTHS_IN_YEAR = 12;
const MINIMUM_PURCHASE_AMOUNT = 800;

type DepreciationResult = {
  year: number;
  depreciationMonths: number;
  depreciationAmount: number;
  percentage: number;
  startAmount: number;
  endAmount: number;
}

type DepreciationInputs = {
  purchaseAmount: number,
  purchaseDate: Date,
  totalDepreciationYears: number
}

const assertPurchaseAmount = (amount: number) => {
  if (amount < 0) {
    throw new TypeError('`purchaseAmount` is invalid.');
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
  previousEndAmount: number,
  monthsLeft: number = MONTHS_IN_YEAR
): {
  depreciationAmount: number;
  percentage: number;
  startAmount: number;
  endAmount: number;
} => {
  const depreciationAmount = toFixedTwo((purchaseAmount / totalDepreciationYears / MONTHS_IN_YEAR) * monthsLeft);
  const percentage = toFixedTwo((depreciationAmount / purchaseAmount) * 100);
  const newEndAmount = toFixedTwo(previousEndAmount - depreciationAmount);

  return {
    depreciationAmount,
    percentage,
    startAmount: previousEndAmount,
    endAmount: newEndAmount,
  };
};

const calculateDepreciation = ({
  purchaseAmount,
  purchaseDate,
  totalDepreciationYears,
}: DepreciationInputs): DepreciationResult[] => {
  assertPurchaseAmount(purchaseAmount);
  assertDepreciationYears(totalDepreciationYears);

  const purchaseMonth: number = new Date(purchaseDate).getMonth() + 1;
  const purchaseYear: number = new Date(purchaseDate).getFullYear();
  const results: DepreciationResult[] = [];

  let endAmount: number = purchaseAmount;
  let monthsLeftInLastYear: number = 0;

  // If the price of the good is less than MINIMUM_NET_AMOUNT, the year is set to 0 automatically.
  if (purchaseAmount < MINIMUM_PURCHASE_AMOUNT) {
    return [{
      year: purchaseYear,
      depreciationMonths: MONTHS_IN_YEAR - purchaseMonth + 1,
      depreciationAmount: purchaseAmount,
      percentage: 100,
      startAmount: purchaseAmount,
      endAmount: 0,
    }]
  }

  for (let index = 0; index < totalDepreciationYears; index++) {
    // Current year
    if (index === 0) {
      const monthsLeftInFirstYear = MONTHS_IN_YEAR - purchaseMonth + 1;
      const result = calculate(purchaseAmount, totalDepreciationYears, endAmount, monthsLeftInFirstYear);
      results.push({
        year: purchaseYear,
        depreciationMonths: monthsLeftInFirstYear,
        ...result,
      });
      endAmount = result.endAmount;

      // If item is purchased in Jan, monthsLeftInLastYear is 0
      // If item is purchased in Dec, monthsLeftInLastYear is 11
      monthsLeftInLastYear = MONTHS_IN_YEAR - monthsLeftInFirstYear;
    }

    // Future years
    if (index > 0) {
      const result = calculate(purchaseAmount, totalDepreciationYears, endAmount);
      results.push({
        year: purchaseYear + index,
        depreciationMonths: MONTHS_IN_YEAR,
        ...result,
      });
      endAmount = result.endAmount;
    }
  }

  if (monthsLeftInLastYear > 0) {
    results.push({
      year: purchaseYear + totalDepreciationYears,
      depreciationMonths: monthsLeftInLastYear,
      ...calculate(purchaseAmount, totalDepreciationYears, endAmount, monthsLeftInLastYear),
    });
  }

  return results;
};

export default calculateDepreciation;
