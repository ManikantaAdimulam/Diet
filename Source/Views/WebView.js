import React, { PureComponent } from "react";
import { WebView, View, StyleSheet } from "react-native";

class ContentView extends PureComponent {
  render() {
    const { url } = this.props;
    return <WebView source={{ uri: url }} flex={1} />;
  }
}

export default ContentView;
