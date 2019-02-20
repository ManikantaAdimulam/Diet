/**
 * @format
 * @lint-ignore-every
 */
import { Navigation } from "react-native-navigation";
import registerScreens from "./Source/Utilities/Navigation";

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
                  visible: false,
                  elevation: 0,
                  noBorder: true
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
      visible: true,
      elevation: 0,
      noBorder: true
    },
    bottomTabs: {
      barStyle: "default"
    },
    bottomTab: {
      selectedTextColor: "red",
      selectedIconColor: "red",
      iconColor: "#000",
      textColor: "#000",
      fontSize: 12,
      iconInsets: {
        top: 2,
        left: 2,
        right: 2,
        bottom: 2
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
                        testID: "FIRST"
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
                        testID: "SECOND"
                      }
                    }
                  }
                }
              ],
              options: {
                topBar: {
                  visible: true,
                  elevation: 0,
                  background: {
                    color: "#000"
                  },
                  noBorder: true
                }
              }
            }
          }
        ]
      }
    }
  });
};
