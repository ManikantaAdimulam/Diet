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
              name: "WelcomeScreen"
            }
          }
        ]
      }
    }
  });
});
