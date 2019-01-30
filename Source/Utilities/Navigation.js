import { Navigation } from "react-native-navigation";
import DashBoard from "../Views/DashBoard";
import App from "../../App";
import Introduction from "../Views/Introduction";
import { Provider, connect } from "react-redux";
import store from "../Redux/Store";
import ConsumptionList from "../Views/ConsumptionList";
import Calender from "../Views/Calender";
import Statistics from "../Views/Statistics";
import LogEntry from "../Views/LogEntry";
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
  Navigation.registerComponentWithRedux(
    "logbook",
    () => ConsumptionList,
    Provider,
    Store
  );
  Navigation.registerComponentWithRedux(
    "calender",
    () => Calender,
    Provider,
    Store
  );
  Navigation.registerComponentWithRedux(
    "statistics",
    () => Statistics,
    Provider,
    Store
  );
  Navigation.registerComponentWithRedux(
    "logEntry",
    () => LogEntry,
    Provider,
    Store
  );
};
export default registerScreens;
