"use strict";

const DATE_FORMAT = "YYYY-MM-DD";

const initArray = (length, callback) => {
  return Array.apply(null, Array(length)).map(callback)
}

export { DATE_FORMAT, initArray }
