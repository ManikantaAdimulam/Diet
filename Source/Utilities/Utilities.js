import moment from "moment";

export const Utilities = {
  nextDay: (date, period, next = true) => {
    var firstDay = new Date(date);
    let periodValue;
    switch (period) {
      case "day":
        periodValue = 1;
      case "year":
        periodValue = leapYear(firstDay.getFullYear()) ? 366 : 365;
        break;
      case "month":
        periodValue = getMonthDays(firstDay);
        break;
      default:
        periodValue = 7;
    }
    var nextWeek = new Date(
      firstDay.getTime() + periodValue * 24 * 60 * 60 * 1000
    );
    var previousWeek = new Date(
      firstDay.getTime() - periodValue * 24 * 60 * 60 * 1000
    );
    return next ? nextWeek : previousWeek;
  }
};

///
const getMonthDays = date => {
  var d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
};

///
const leapYear = year => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};
