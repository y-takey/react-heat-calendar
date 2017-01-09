const moment = require("moment");

import { DATE_FORMAT, initArray } from "./utils";

const DAYS_IN_WEEK = 7;

export default class Calendar {
  constructor(beginDate, endDate) {
    this.beginDate = moment(beginDate)
    this.fromDate = moment(beginDate).startOf("month")
    this.endDate = moment(endDate)
    this.toDate = moment(endDate).endOf("month")
    this.data = initArray(DAYS_IN_WEEK, (_, _i) =>
      initArray(this.weekNum(this.toDate), (_, _i) => null)
    )
  }

  weekNum(date) {
    if (!moment.isMoment(date)) {
      date = moment(date, DATE_FORMAT);
    }
    const days = date.diff(this.fromDate, "days");
    return Math.ceil((days + this.fromDate.day() + 1) / DAYS_IN_WEEK )
  }

  set(date, cell) {
    if (!moment.isMoment(date)) {
      date = moment(date, DATE_FORMAT);
    }
    this.data[date.day()][this.weekNum(date) - 1] = cell
  }

  rows() {
    return this.data
  }

  header() {
    let ret = [];
    let totalNum = this.weekNum(this.toDate)
    let beforeNum = 1;
    for (let cursor = moment(this.fromDate); cursor.isSameOrBefore(this.toDate);) {
      let monthName = cursor.format("MMM")
      cursor.add(1, 'months')
      let num = this.weekNum(cursor)
      let colNum = num - beforeNum
      if (cursor.isAfter(this.toDate, 'month')) colNum = totalNum;
      ret.push([monthName, colNum])
      beforeNum = num
      totalNum -= colNum
    }
    return ret
  }
}
