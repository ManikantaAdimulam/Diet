/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import {AppRegistry} from 'react-native';
import App from "./App";
// import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";
import registerScreens from "./Source/Utilities/Navigation";
// AppRegistry.registerComponent(appName, () => App);

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: "AppStack",
        children: [
          {
            component: {
              name: "WelcomeScreen",
              options: {
                topBar: {
                  visible: false
                }
              }
            }
          }
        ]
      }
    }
  });
});

export const tabs = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            bottomTabs: {
              id: "tabs",
              children: [
                {
                  component: {
                    name: "dashboard",
                    options: {
                      bottomTab: {
                        text: "Tab 1",
                        icon: require("./Assets/logs.png"),
                        testID: "FIRST",
                        selectedTextColor: "red",
                        selectedIconColor: "red"
                      }
                    }
                  }
                },
                {
                  component: {
                    name: "statistics",
                    options: {
                      bottomTab: {
                        text: "Tab 2",
                        icon: require("./Assets/statistics.png"),
                        testID: "SECOND",
                        selectedTextColor: "red"
                      }
                    }
                  }
                }
              ],
              options: {
                topBar: {
                  visible: true,
                  background: {
                    color: "#000"
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
  Navigation.setDefaultOptions({
    topBar: {
      visible: true
    }
  });
};
