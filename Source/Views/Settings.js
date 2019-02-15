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

class Settings extends Component {
  constructor(props) {
    super(props);
    this.callBack = this.callBack.bind(this);
  }
  callBack = (key, value) => {
    console.log(key, value);
  };
  /**
   * UI
   *
   * @returns
   * @memberof Settings
   */
  render() {
    const { settingsOptions, viewOptions } = this.props.settings;
    console.log(this.props, "Settings");
    return (
      <View style={styles.container}>
        <MenuList data={settingsOptions} callBack={this.callBack} />
        <MenuList data={viewOptions} callBack={this.callBack} />
      </View>
    );
  }
}

const mapStateToProps = state => ({ settings: state.SettingsReducer });

export default connect(mapStateToProps)(Settings);

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: "space-evenly"
  }
});
