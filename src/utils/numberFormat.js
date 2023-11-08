import numeral from "numeral";

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$0,0" : "$0,0.00");
}

export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format("0.00a").replace(".00", "");
}

export function fData(number) {
  if (number === 0) return numeral(number).format("0");
  if (number % 1 === 0) {
    if (number < 10) {
      return numeral(number).format("00");
    } else {
      return numeral(number).format("0");
    }
  } else {
    if (number < 10) {
      return numeral(number).format("0.0");
    } else {
      return numeral(number).format("0.0");
    }
  }
}

export function fSize(number) {
  return numeral(number).format("0.0 b");
}
