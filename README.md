# asset-depreciation-calculator

> Calculate the asset depreciation

## Installation

```console
$ npm install asset-depreciation-calculator
```

## Usage

```js
const calculateDepreciation = require("asset-depreciation-calculator");

calculateDepreciation({
  purchaseAmount: 20000,
  purchaseDate: new Date("2016-08-01"),
  totalDepreciationYears: 5,
})
// => [{
//   year: 2016,
//   depreciationMonths: 5,
//   depreciationAmount: 1666.67,
//   percentage: 8.33,
//   startAmount: 20000,
//   endAmount: 18333.33,
// }, {
//   year: 2017,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startAmount: 18333.33,
//   endAmount: 14333.33,
// }, {
//   year: 2018,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startAmount: 14333.33,
//   endAmount: 10333.33,
// }, {
//   year: 2019,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startAmount: 10333.33,
//   endAmount: 6333.33,
// }, {
//   year: 2020,
//   depreciationMonths: 12,
//   depreciationAmount: 4000,
//   percentage: 20,
//   startAmount: 6333.33,
//   endAmount: 2333.33,
// }, {
//   year: 2021,
//   depreciationMonths: 7,
//   depreciationAmount: 2333.33,
//   percentage: 11.67,
//   startAmount: 2333.33,
//   endAmount: 0,
// }]
```

## API

### calculateDepreciation({ purchaseAmount, purchaseDate, totalDepreciationYears })

#### purchaseAmount

Type: `number`

#### purchaseDate

Type: `Date`

#### totalDepreciationYears

Type: `number`
