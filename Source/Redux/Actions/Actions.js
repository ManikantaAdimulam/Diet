///
const ADD_NEW_ENTRY = "ADD_NEW_ENTRY";
///
const EDIT_ENTRY = "EDIT_ENTRY";
///
const INITIAL_DATA = "INITIAL_DATA";
///
const addNewEntry = entry => {
  return {
    type: ADD_NEW_ENTRY,
    entry
  };
};
///
const editEntry = (entry, index) => {
  return {
    type: EDIT_ENTRY,
    entry,
    index
  };
};
///
const setInitialData = data => {
  return {
    type: INITIAL_DATA,
    data
  };
};
export { ADD_NEW_ENTRY, EDIT_ENTRY, addNewEntry, editEntry, setInitialData };
