import sqlite, { SQLiteDatabase } from "react-native-sqlite-storage";

///
const dbName = "Diet.db";
///
const dbVersion = "1.0";
///
const db = createDataBase();
///
const dbId = "Manikanta.Diet";

/**
 * Error call back for DB
 *
 * @param {*} err
 */
function errorCB(err) {
  // console.log("SQL Error: " + err);
}

/**
 * Open call back
 *
 */
function openCB() {
  // console.log("Database OPENED");
}
function createDataBase() {
  return sqlite.openDatabase(dbName, dbVersion, dbId, openCB, errorCB);
}

/**
 * Creating a table
 *
 */
function createTable() {
  const query =
    "create table Diet (id INTEGER PRIMARY KEY AUTOINCREMENT,Date TEXT, Name TEXT, Animal TEXT, Quantity TEXT, Time TEXT)";
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, result) => {
      // console.log(result, "result");
    });
  });
}

/**
 * Inserting data
 *
 * @param {*} params
 */
function insertData(params, completion) {
  let query = "insert into Diet(Name, Animal, Quantity, Date, Time) values (";
  let dataString = "";
  params.data.forEach(element => {
    Object.keys(element).forEach(key => {
      dataString += JSON.stringify(element[key]) + ",";
    });
  });
  query += dataString.slice(0, -1) + ")";
  // console.log(query, "query", params);
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, result) => {
      if (result.error === undefined) {
        completion(true);
      } else {
        completion(false);
      }
    });
  });
}

function fetchDataFromDB(date, success, failure) {
  let query = "";
  if (date === "") {
    query = "select * from Diet";
  }
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, result) => {
      if (result.error === undefined) {
        success(result.rows.raw());
      } else {
        failure(true);
      }
    });
  });
}
function fetchData(query, success, failure) {
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, result) => {
      if (result.error === undefined) {
        success(result.rows.raw());
      } else {
        failure(true);
      }
    });
  });
}
export { createDataBase, createTable, insertData, fetchDataFromDB, fetchData };
