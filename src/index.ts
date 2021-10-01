
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

const calculate = (
  purchaseAmount: number,
  totalDepreciationYears: number,
  previousEndAmount: number,
  monthsLeft: number,
  isLastPart: boolean = false,
): {
  depreciationAmount: number;
  percentage: number;
  startAmount: number;
  endAmount: number;
} => {
  const depreciationAmount = Math.round((purchaseAmount / totalDepreciationYears / MONTHS_IN_YEAR) * monthsLeft);
  const newEndAmount = previousEndAmount - depreciationAmount;

  // Because of the rounding, even if the calculation is correct, sometimes there is €0.01 left over in the last part.
  // For example, if total is 31, divided by 3 it would be 10 / 10 / 10.
  // Also, there's a case, such as 29, where it returns negative result.
  // So, had been added isLastPart to input parametes for handle this case. 
  if (isLastPart) {
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
  
  if (totalDepreciationYears === 0) {
    return [{
      year: purchaseYear,
      depreciationMonths: 0,
      depreciationAmount: purchaseAmount,
      percentage: 1,
      startAmount: purchaseAmount,
      endAmount: 0,
    }]
  }

  const parts: number = purchaseMonth > 1 ? totalDepreciationYears + 1 : totalDepreciationYears;
  const monthsInFirstYear : number = MONTHS_IN_YEAR - purchaseMonth + 1;
  const monthInLastYear : number = monthInFirstYear === MONTHS_IN_YEAR ? MONTHS_IN_YEAR : MONTHS_IN_YEAR - monthInFirstYear;

  let monthInThisYear : number = monthInFirstYear;
  endAmount = purchaseAmount;

  for (let index = 0; index < parts; index++) {        
    const result = calculate(purchaseAmount, totalDepreciationYears, endAmount, monthInThisYear, index === parts - 1);
    results.push({
      year: purchaseYear + index,
      depreciationMonths: monthInThisYear,
      ...result,
    });
    endAmount = result.endAmount;  
    // calculate month in year for next step and control the last year case.
    monthInThisYear = (index + 1 === parts - 1) ? monthInLastYear : MONTHS_IN_YEAR;
  }
  
  return results;
};

export default calculateDepreciation;