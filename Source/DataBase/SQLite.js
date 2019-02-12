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
function errorCB(err) {}

/**
 * Open call back
 *
 */
function openCB() {}
function createDataBase() {
  return sqlite.openDatabase(dbName, dbVersion, dbId, openCB, errorCB);
}

/**
 * Creating a table
 *
 */
function createTable() {
  const query =
    "create table Diet (id INTEGER PRIMARY KEY AUTOINCREMENT,Date INTEGER, Name TEXT, Animal TEXT, Quantity TEXT, Time TEXT)";
  db.transaction(tx => {
    tx.executeSql(query, [], (tx, result) => {});
  });
}

/**
 * Inserting data
 *
 * @param {*} params
 */
function insertData(params, completion) {
  let query =
    "insert or replace into Diet(Name, Animal, Quantity, Date, Time) values (";
  let dataString = "";
  params.data.forEach(element => {
    Object.keys(element).forEach(key => {
      dataString += JSON.stringify(element[key]) + ",";
    });
  });
  query += dataString.slice(0, -1) + ")";
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

/**
 *
 *
 * @param {*} params
 * @param {*} id
 * @param {*} completion
 */
function updateData(params, id, completion) {
  let query = "update Diet set ";
  let dataString = "";
  params.data.forEach(obj => {
    Object.keys(obj).forEach(key => {
      dataString += key + "=" + JSON.stringify(obj[key]) + ",";
    });
  });
  query += dataString.slice(0, -1) + " where id=" + id;
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

/**
 *
 *
 * @param {*} date
 * @param {*} success
 * @param {*} failure
 */
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

/**
 *
 *
 * @param {*} query
 * @param {*} success
 * @param {*} failure
 */
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
export {
  createDataBase,
  createTable,
  insertData,
  fetchDataFromDB,
  fetchData,
  updateData
};
