import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image
} from "react-native";
import { connect } from "react-redux";
import SafeAreaWrapper from "../Components/SafeAreaWrapper";
import MenuList from "../Components/Menu";

const settingsOptions = [
  { key: "Weight", value: "gm" },
  { key: "Remainder", value: "9:00AM" },
  { key: "Theme", value: "Dark" }
];
const viewOptions = [
  { key: "Privacy Policy", value: "" },
  { key: "Terms of Service", value: "" },
  { key: "Contact Us", value: "" }
];
export class Settings extends Component {
  /**
   * UI
   *
   * @returns
   * @memberof Settings
   */
  render() {
    return (
      <View style={styles.container}>
        <MenuList data={settingsOptions} />
        <MenuList data={viewOptions} />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Settings);

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: "space-evenly"
  }
  //   item: {
  //     padding: 8,
  //     fontSize: 18,
  //     height: 60,
  //     flexDirection: "row"
  //   },
  //   separator: {
  //     height: 1,
  //     width,
  //     backgroundColor: "lightgray"
  //   },
  //   cellTitle: {
  //     fontSize: 16,
  //     fontWeight: "bold"
  //   },
  //   cellSubTitle: {
  //     fontSize: 14,
  //     fontWeight: "400"
  //   },
  //   nextButton: {
  //     height: 44,
  //     width: 44,
  //     resizeMode: "center"
  //   },
  //   optionsView: {
  //     flex: 1,
  //     justifyContent: "space-evenly"
  //   }
});
