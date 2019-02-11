import { ADD_NEW_ENTRY } from "../Actions/Actions";
const initialState = { data: [] };

export function listReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_ENTRY:
      return {
        ...state.data,
        data: manipulate(state.data, action.entry)
      };

    default:
      return { ...state };
  }
}
function manipulate(previousData, newEntry) {
  var newPreviousDataObj = [];
  if (previousData.length > 0) {
    var isExistedDate = false;
    previousData.forEach(element => {
      var newElementObj = element;
      if (element.date === newEntry.date) {
        newElementObj.data.push(newEntry.data[0]);
        isExistedDate = true;
      }
      newPreviousDataObj.push(newElementObj);
    });
    if (!isExistedDate) {
      newPreviousDataObj.push(newEntry);
    }
    return newPreviousDataObj;
  } else {
    return [newEntry];
  }
}
