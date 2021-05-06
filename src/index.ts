
const MONTHS_IN_YEAR = 12;
const MINIMUM_PURCHASE_AMOUNT = 80000;

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

export const assertPurchaseAmount = (amount: number): void => {
  if (isNaN(amount) || amount < 0 || amount % 1 !== 0) { // Check if amount is integer, not float.
    throw new TypeError('`purchaseAmount` is invalid.');
  }
};

export const assertPurchaseDate = (date: Date): void => {
  if (isNaN(date.valueOf())) {
    throw new TypeError('`purchaseDate` is invalid.');
  }
};

export const assertDepreciationYears = (years: number): void => {
  if (isNaN(years) || years < 1 || years % 1 !== 0) { // Check if years is integer, not float.
    throw new TypeError('`totalDepreciationYears` is invalid.');
  }
};

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
  const depreciationAmount = Math.round((purchaseAmount / totalDepreciationYears / MONTHS_IN_YEAR) * monthsLeft);
  const newEndAmount = previousEndAmount - depreciationAmount;

  // Because of the rounding, even if the calculation is correct, sometimes there is €0.01 left over.
  // For example, if total is 31, divided by 3 it would be 10 / 10 / 10.
  if (newEndAmount === 1) {
    return {
      depreciationAmount: previousEndAmount,
      percentage: previousEndAmount / purchaseAmount,
      startAmount: previousEndAmount,
      endAmount: 0,
    }
  }

  return {
    depreciationAmount,
    percentage: depreciationAmount / purchaseAmount,
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
  assertPurchaseDate(purchaseDate);
  assertDepreciationYears(totalDepreciationYears);

  const purchaseMonth: number = new Date(purchaseDate).getMonth() + 1;
  const purchaseYear: number = new Date(purchaseDate).getFullYear();
  const results: DepreciationResult[] = [];

  let endAmount: number = purchaseAmount;
  let monthsLeftInLastYear = 0;

  // If the price of the good is less than MINIMUM_PURCHASE_AMOUNT, the year is set to 0 automatically.
  if (purchaseAmount < MINIMUM_PURCHASE_AMOUNT) {
    return [{
      year: purchaseYear,
      depreciationMonths: MONTHS_IN_YEAR - purchaseMonth + 1,
      depreciationAmount: purchaseAmount,
      percentage: 1,
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
    } else { // Future years
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
