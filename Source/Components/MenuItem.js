import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  InteractionManager
} from "react-native";

const MenuItem = ({ item, index, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <Text
          style={{
            color: isSelected === index ? "#ffec60" : "#fff",
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

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  menuItem: {
    // flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default MenuItem;
