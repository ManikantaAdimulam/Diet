/**
 * @format
 * @lint-ignore-every
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
                        text: "Log Book",
                        icon: { uri: "logs" },
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
                        text: "Statistics",
                        icon: { uri: "statistics" },
                        testID: "SECOND",
                        selectedTextColor: "red",
                        selectedIconColor: "red"
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
