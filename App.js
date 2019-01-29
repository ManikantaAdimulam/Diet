/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { Provider, connect } from "react-redux";
// import store from "./Source/Redux/Store";
import Introduction from "./Source/Views/Introduction";
// const Store = store();
export default class App extends Component {
  render() {
    return <Introduction />;
  }
}
