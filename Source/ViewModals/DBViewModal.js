import { insertData, fetchDataFromDB, fetchData } from "../DataBase/SQLite";
import { addNewEntry } from "../Redux/Actions/Actions";
///
const insertDataIntoDB = (data, result) => {
  insertData(data, isSuccess => {
    result(isSuccess);
  });
};
///
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
    error => {
      // console.log(error, "error");
    }
  );
};
///
const fetchDataForDateRage = (from, to, success, failure) => {
  let fromDate = JSON.stringify(from);
  let toDate = JSON.stringify(to);
  let query =
    "select * from Diet where date >= " + fromDate + "and date <= " + toDate;
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
export { insertDataIntoDB, fetchFromDB, fetchDataForDateRage };
