import React from "react";
import { StyleSheet, Dimensions, SafeAreaView, View } from "react-native";

const SafeAreaWrapper = props => {
  return (
    <View style={styles.container}>
      <SafeAreaView>{props.children}</SafeAreaView>
    </View>
  );
};
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4d766",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default SafeAreaWrapper;
