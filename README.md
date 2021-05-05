# asset-depreciation-calculator

> Calculate the asset depreciation

## Installation

```console
$ npm install asset-depreciation-calculator
```

## Usage

```js
const calculateDepreciation = require("asset-depreciation-calculator");

calculateDepreciation(
  20000,
  "2016-08-01",
  5,
)
// => [{
//   year: 2016,
//   depreciationMonths: 5,
//   depreciationAmount: 1666.67,
//   percentage: 8.33,
//   startValue: 20000,
//   endValue: 18333.33,
// }, {
//   year: 2017,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startValue: 18333.33,
//   endValue: 14333.33,
// }, {
//   year: 2018,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startValue: 14333.33,
//   endValue: 10333.33,
// }, {
//   year: 2019,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startValue: 10333.33,
//   endValue: 6333.33,
// }, {
//   year: 2020,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startValue: 6333.33,
//   endValue: 2333.33,
// }, {
//   year: 2021,
//   depreciationMonths: 7,
//   depreciationAmount: 2333.33,
//   percentage: 11.67,
//   startValue: 2333.33,
//   endValue: 0,
// }]
```

## API

### calculateDepreciation(purchaseAmount, purchaseDate, totalDepreciationYears)

#### purchaseAmount

Type: `number`

#### purchaseDate

Type: `string` - should be a correct date string. For example: "2016-08-01"

#### totalDepreciationYears

Type: `number`
