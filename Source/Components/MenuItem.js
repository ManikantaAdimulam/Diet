import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

/**
 * Menu item with defined parameters.
 *
 * @param {*} { item, index, onPress, isSelected, Settings }
 * @returns
 */
const MenuItem = ({ item, index, onPress, isSelected, Settings }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <Text
          style={{
            color: Settings.Theme === "Dark" ? "#ffec60" : "#000",
            fontWeight: isSelected === index ? "800" : "bold",
            fontSize: isSelected === index ? 16 : 14
          }}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
///
const { height, width } = Dimensions.get("window");
///
const styles = StyleSheet.create({
  menuItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});
///
const mapStateToProps = state => ({ ...state.SettingsReducer });
///
export default connect(mapStateToProps)(MenuItem);
