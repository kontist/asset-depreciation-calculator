
const MONTHS_IN_YEAR = 12;

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
  if (isNaN(years) || years < 0 || years % 1 !== 0) { // Check if years is integer, not float.
    throw new TypeError('`totalDepreciationYears` is invalid.');
  }
};

const calculateDepreciation = ({
  purchaseAmount,
  purchaseDate,
  totalDepreciationYears,
}: DepreciationInputs): DepreciationResult[] => {
  assertPurchaseAmount(purchaseAmount);
  assertPurchaseDate(purchaseDate);
  assertDepreciationYears(totalDepreciationYears);

  if (totalDepreciationYears === 0) {
    return [{
      year: purchaseDate.getFullYear(),
      depreciationMonths: 0,
      depreciationAmount: purchaseAmount,
      percentage: 1,
      startAmount: purchaseAmount,
      endAmount: 0,
    }]
  }

  const startDate = new Date(Date.UTC(
    purchaseDate.getFullYear(),
    purchaseDate.getMonth(),
    1
  ));
  const endDate = new Date(Date.UTC(
    startDate.getFullYear() + totalDepreciationYears,
    startDate.getMonth() - 1,
    1
  ));
  const depreciationAmountPerMonth = purchaseAmount / (totalDepreciationYears * MONTHS_IN_YEAR);

  const results: DepreciationResult[] = [];
  let runningAmountForYear = 0;
  let runningMonthsForYear = 0;
  let remainders = 0;

  for (let date = new Date(startDate); date <= endDate; date.setUTCMonth(date.getUTCMonth() + 1)) {
    runningAmountForYear += depreciationAmountPerMonth;
    runningMonthsForYear++;

    // At the end of the year or when we have reached the end of the
    // depreciation period, we add the year to the results.
    if (date.getMonth() === 11 || date.getTime() === endDate.getTime()) {
      let depreciationAmount = Math.round(runningAmountForYear);

      remainders += runningAmountForYear - depreciationAmount;

      // In the last year, we add all remainders to avoid rounding errors.
      // For example, when depreciating 31 over 3 years, the last year’s
      // depreciation amount should be 11 instead of 10.
      if (date.getTime() === endDate.getTime()) {
        depreciationAmount = Math.round(depreciationAmount + remainders);
      }

      // In the first year, the start amount is the purchase amount.
      // In all other years, the start amount is last year’s end amount.
      const startAmount = results.length > 0
        ? results[results.length - 1].endAmount
        : purchaseAmount;

      results.push({
        year: date.getFullYear(),
        depreciationMonths: runningMonthsForYear,
        depreciationAmount,
        percentage: depreciationAmount / purchaseAmount,
        startAmount,
        endAmount: startAmount - depreciationAmount
      });

      runningAmountForYear = 0;
      runningMonthsForYear = 0;
    }
  }

  return results;
};

export default calculateDepreciation;
