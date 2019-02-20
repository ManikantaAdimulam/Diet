import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import MenuList from "../Components/Menu";
import { Navigation } from "react-native-navigation";

/**
 *
 *
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {
  /**
   * Creates an instance of Settings.
   * @param {*} props
   * @memberof Settings
   */
  constructor(props) {
    super(props);
    this.callBack = this.callBack.bind(this);
  }

  /**
   * Call back for theme selection.
   *
   * @memberof Settings
   * @param {*} key
   * @param {*} value
   */
  callBack = (key, value) => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: true,
        background: {
          color: value === "Dark" ? "black" : "#fff"
        },
        elevation: 0,
        noBorder: true
      }
    });
    Navigation.popTo("tabs");
  };

  /**
   * UI
   *
   * @returns
   * @memberof Settings
   */
  render() {
    const { settingsOptions, viewOptions } = this.props.settings;
    return (
      <View style={styles.container}>
        <MenuList data={settingsOptions} callBack={this.callBack} />
        <MenuList data={viewOptions} callBack={this.callBack} />
      </View>
    );
  }
}

///
const mapStateToProps = state => ({ settings: state.SettingsReducer });

///
export default connect(mapStateToProps)(Settings);

///
const { height, width } = Dimensions.get("window");

///
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    justifyContent: "space-evenly"
  }
});
