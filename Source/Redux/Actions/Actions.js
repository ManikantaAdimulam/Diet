///
const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
///
const EDIT_ENTRY = "EDIT_ENTRY";
///
const INITIAL_DATA = "INITIAL_DATA";
///
const UPDATE_SETTINGS = "UPDATE_SETTINGS";

/**
 *
 *
 * @param {*} entry
 * @returns
 */
const addNewEntry = entry => {
  return {
    type: ADD_NEW_ENTRY,
    entry
  };
};

/**
 *
 *
 * @param {*} entry
 * @param {*} index
 * @returns
 */
const editEntry = (entry, index) => {
  return {
    type: EDIT_ENTRY,
    entry,
    index
  };
};

/**
 *
 *
 * @param {*} data
 * @returns
 */
const setInitialData = data => {
  return {
    type: INITIAL_DATA,
    data
  };
};

/**
 *
 *
 * @param {*} key
 * @param {*} value
 * @returns
 */
const updateSettings = (key, value) => {
  return {
    type: UPDATE_SETTINGS,
    key,
    value
  };
};

///
export {
  ADD_NEW_ENTRY,
  EDIT_ENTRY,
  UPDATE_SETTINGS,
  addNewEntry,
  editEntry,
  setInitialData,
  updateSettings
};
