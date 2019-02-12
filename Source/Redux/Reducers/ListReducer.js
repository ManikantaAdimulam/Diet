import { ADD_NEW_ENTRY, EDIT_ENTRY } from "../Actions/Actions";
import moment from "moment";
const initialState = { data: [] };

export function listReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_ENTRY:
      return {
        ...state.data,
        data: manipulate(state.data, action.entry)
      };
    case EDIT_ENTRY:
      return {
        ...state.data,
        data: state.data.map(entry => {
          if (entry.date === action.entry.date) {
            return {
              ...entry,
              data: entry.data.map(oldEntry => {
                if (oldEntry.id === action.index) {
                  let entryObj = action.entry.data[0];
                  entryObj.id = action.index;
                  return entryObj;
                }
                return oldEntry;
              })
            };
          }
          return entry;
        })
        //updateData(state.data, action.entry, action.index)
      };
    default:
      return { ...state };
  }
}

/**
 *
 *
 * @param {*} previousData
 * @param {*} newEntry
 * @returns
 */
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

// function updateData(data, newEntry, index) {
//   return data.map(entry=>{

//   })
// }
