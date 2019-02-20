import { insertData, fetchDataFromDB, fetchData } from "../DataBase/SQLite";
import { addNewEntry } from "../Redux/Actions/Actions";

/**
 * Insert data into DB.
 *
 * @param {*} data
 * @param {*} result
 */
const insertDataIntoDB = (data, result) => {
  insertData(data, isSuccess => {
    result(isSuccess);
  });
};

/**
 * Fetch data from DB.
 *
 * @param {*} date
 * @param {*} dispatch
 */
const fetchFromDB = (date, dispatch) => {
  fetchDataFromDB(
    date,
    data => {
      data.forEach(item => {
        let entry = { date: "", data: [] };
        entry.date = item["Date"];
        delete item.date;
        entry.data = [item];
        dispatch(addNewEntry(entry));
      });
    },
    error => {}
  );
};

/**
 * Fetch data between dates.
 *
 * @param {*} from
 * @param {*} to
 * @param {*} success
 * @param {*} failure
 */
const fetchDataForDateRage = (from, to, success, failure) => {
  let fromDate = JSON.stringify(from);
  let toDate = JSON.stringify(to);
  let query =
    "select * from Diet where date >= " +
    fromDate / 1000 +
    " and date <= " +
    toDate / 1000;

  fetchData(
    query,
    result => {
      success(result);
    },
    error => {
      failure(error);
    }
  );
};

///
export { insertDataIntoDB, fetchFromDB, fetchDataForDateRage };
