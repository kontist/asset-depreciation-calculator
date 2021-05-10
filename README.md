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
  purchaseAmount: 2000000,
  purchaseDate: new Date("2016-01-01"),
  totalDepreciationYears: 5,
})
// => [{
//   year: 2016,
//   depreciationMonths: 12,
//   depreciationAmount: 400000,
//   percentage: 0.2,
//   startAmount: 2000000,
//   endAmount: 1600000,
// }, {
//   year: 2017,
//   depreciationMonths: 12,
//   depreciationAmount: 400000,
//   percentage: 0.2,
//   startAmount: 1600000,
//   endAmount: 1200000,
// }, {
//   year: 2018,
//   depreciationMonths: 12,
//   depreciationAmount: 400000,
//   percentage: 0.2,
//   startAmount: 1200000,
//   endAmount: 800000,
// }, {
//   year: 2019,
//   depreciationMonths: 12,
//   depreciationAmount: 400000,
//   percentage: 0.2,
//   startAmount: 800000,
//   endAmount: 400000,
// }, {
//   year: 2020,
//   depreciationMonths: 12,
//   depreciationAmount: 400000,
//   percentage: 0.2,
//   startAmount: 400000,
//   endAmount: 0,
// }]
```

## API

### calculateDepreciation({ purchaseAmount, purchaseDate, totalDepreciationYears })

#### purchaseAmount

The purchase amount in cents.

Type: `number`.

#### purchaseDate

Type: `Date`

#### totalDepreciationYears

Type: `number`
