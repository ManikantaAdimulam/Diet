import { UPDATE_SETTINGS } from "../Actions/Actions";
import { Theme, Weight } from "../../Utilities/Utilities";

const initialState = {
  settingsOptions: [
    { key: "Weight", value: "gm" },
    { key: "Remainder", value: "9:00AM" },
    { key: "Theme", value: "Dark" }
  ],
  viewOptions: [
    { key: "Privacy Policy", value: "" },
    { key: "Terms of Service", value: "" },
    { key: "Contact Us", value: "" }
  ],
  Settings: {
    Weight: Weight.grams,
    Remainder: "9:00 AM",
    Theme: Theme.dark
  }
};

export function SettingsReducer(state = initialState, action) {
  if ((action.type = UPDATE_SETTINGS)) {
    return {
      ...state,
      settingsOptions: state.settingsOptions.map(item => {
        if (item.key === action.key) {
          return {
            ...item,
            value: action.value
          };
        }
        return item;
      })
    };
  }
  return state;
}
