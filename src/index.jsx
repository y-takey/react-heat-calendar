const React = require("react");
const moment = require("moment");
const countBy = require("lodash.countby");
const sortBy = require("lodash.sortby");

import Calendar from './Calendar';
import Legend from './Legend';
import { DATE_FORMAT, initArray } from "./utils";

const COLORS = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"]
const ROW_HEADERS = ["", "Mon", "", "Wed", "", "Fri", ""]
const STYLES = {
  outline: {
    padding: "10px 15px",
    borderRadius: "3px",
    border: "1px #e5e5e5 solid",
    display: "inline-block"
  },
  table: {
    borderCollapse: "separate",
    borderSpacing: "2px"
  },
  columnHeader: {
    color: "#767676",
    fontSize: "9px",
    lineHeight: "20px"
  },
  rowHeader: {
    paddingRight: "5px",
    color: "#767676",
    fontSize: "9px",
    lineHeight: "10px"
  },
  cell: {
    height: "10px",
    width: "10px"
  }
}

class HeatCalendar extends React.Component {
  calendar() {
    let { beginDate, endDate } = this.props;
    const data = this.generateData();

    if (!beginDate) beginDate = data[0].date;
    if (!endDate) endDate = data[data.length - 1].date;

    const calendar = new Calendar(beginDate, endDate)
    this.paddingCalendar(calendar, beginDate, endDate, data)

    return calendar;
  }

  generateData() {
    const countByDays = countBy(this.props.data, (item) => {
      return moment(item.date).format(DATE_FORMAT);
    });

    const maxCount = Math.max(...Object.values(countByDays))
    const levels = initArray(COLORS.length, (_, i) => maxCount * i / (COLORS.length - 1));

    return sortBy(Object.entries(countByDays).map(([date, count], _i) => {
      const level = levels.findIndex(num => num >= count)
      return { date, count, level };
    }), "date")
  }

  paddingCalendar(calendar, beginDate, endDate, data) {
    const stopper = moment(endDate)
    for (let cursor = moment(beginDate); cursor.isSameOrBefore(stopper); cursor.add(1, 'days')) {
      let key = cursor.format(DATE_FORMAT)
      let entry = data.find((element) => element.date == key)
      calendar.set(cursor, {
        title: `${key}: ${(entry && entry.count) || 0}`,
        style: { backgroundColor: COLORS[(entry && entry.level) || 0] }
      })
    }
  }

  renderHeader([monthName, colNum], i) {
    return <td
      key={ `head-${i}` }
      style={ STYLES.columnHeader }
      colSpan={ colNum }>{ monthName }</td>
  }

  renderRow(row, i) {
    return <tr key={ `row${i}` }>
      <td style={ STYLES.rowHeader }>
        { ROW_HEADERS[i] }
      </td>
      { row.map((cell, k) => this.renderCell(cell, i, k)) }
    </tr>
  }

  renderCell(cell, i, j) {
    const { title , style } = (cell || {})
    const mergedStyle = Object.assign({},
      STYLES.cell,
      (style || { backgroundColor: "transparent" })
    );
    return <td key={ `cell${i}-${j}` } title={ title } style={ mergedStyle }></td>
  }

  render() {
    if (!this.props.data.length) return <div/>;

    const calendar = this.calendar();

    return <div style={ STYLES.outline }>
      <table style={ STYLES.table }>
        <tbody>
          <tr>
            <td></td>
            { calendar.header().map(this.renderHeader) }
          </tr>
          {calendar.rows().map(this.renderRow, this)}
        </tbody>
      </table>
      <Legend colors={COLORS} />
    </div>
  }
}

export default HeatCalendar;
