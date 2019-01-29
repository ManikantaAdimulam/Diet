import { Navigation } from "react-native-navigation";
import DashBoard from "../Views/DashBoard";
import App from "../../App";
import Introduction from "../Views/Introduction";
import { Provider, connect } from "react-redux";
import store from "../Redux/Store";
const Store = store();
const registerScreens = () => {
  Navigation.registerComponentWithRedux(
    "WelcomeScreen",
    () => App,
    Provider,
    Store
  );
  Navigation.registerComponentWithRedux(
    "introduction",
    () => Introduction,
    Provider,
    Store
  );
  Navigation.registerComponentWithRedux(
    "dashboard",
    () => DashBoard,
    Provider,
    Store
  );
  Navigation.setDefaultOptions({
    topBar: {
      visible: false
    }
  });
};
export default registerScreens;
