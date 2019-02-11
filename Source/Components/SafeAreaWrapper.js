import React from "react";
import { StyleSheet, Dimensions, SafeAreaView, View } from "react-native";

const SafeAreaWrapper = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView>{children}</SafeAreaView>
    </View>
  );
};
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default SafeAreaWrapper;
