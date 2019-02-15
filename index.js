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
                  visible: false
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
    },
    bottomTabs: {
      barStyle: "black"
    },
    bottomTab: {
      selectedTextColor: "#ffec60",
      selectedIconColor: "#ffec60",
      iconColor: "#fff",
      textColor: "#fff",
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
    },
    bottomTabs: {
      barStyle: "black"
    }
  });
};
