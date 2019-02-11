export const Utilities = {
  nextDay: (date, period) => {
    var firstDay = new Date(date);
    let periodValue;
    switch (period) {
      case "year":
        periodValue = leapYear(firstDay.getFullYear()) ? 366 : 365;
        break;
      case "month":
        periodValue = getMonthDays(firstDay);
        break;
      default:
        periodValue = 7;
    }
    console.log(periodValue);
    var nextWeek = new Date(
      firstDay.getTime() + periodValue * 24 * 60 * 60 * 1000
    );
    return nextWeek;
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
