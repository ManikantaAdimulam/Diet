import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image
} from "react-native";

const MenuList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      keyExtractor={(item, index) => index.toString()}
      bounces={false}
    />
  );
};
const renderItem = ({ item: { key, value } }) => {
  return (
    <View style={styles.item}>
      <View style={styles.optionsView}>
        <Text style={styles.cellTitle}>{key}</Text>
        {value != "" && <Text style={styles.cellSubTitle}>{value}</Text>}
      </View>
      <Image source={{ uri: "next.png" }} style={styles.nextButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 22
  // },
  item: {
    padding: 8,
    fontSize: 18,
    height: 60,
    flexDirection: "row"
  },
  separator: {
    height: 1,
    width,
    backgroundColor: "lightgray"
  },
  cellTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  cellSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "gray"
  },
  nextButton: {
    height: 44,
    width: 44,
    resizeMode: "center"
  },
  optionsView: {
    flex: 1,
    justifyContent: "space-evenly"
  }
});

const { height, width } = Dimensions.get("window");

export default MenuList;
