import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  Image
} from "react-native";

const List = ({ list }) => {
  console.log("list", list);
  return (
    <View style={styles.container}>
      <SectionList
        sections={list}
        renderSectionHeader={this.renderSection}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    </View>
  );
};
/**
 * Section Item
 *
 * @memberof List
 */
renderItem = ({ item }) => {
  let icon = "";
  switch (item.icon) {
    case "pig":
      icon = require("../../Assets/pig.png");
      break;
    case "goat":
      icon = require("../../Assets/goat.png");
      break;
    case "sheep":
      icon = require("../../Assets/sheep.png");
      break;
    case "chicken":
      icon = require("../../Assets/chicken.png");
      break;
    case "cow":
      icon = require("../../Assets/cow.png");
      break;
    default:
      icon = require("../../Assets/pig.png");
  }
  return (
    <View style={styles.card}>
      <View style={styles.meatView}>
        <Image source={icon} style={styles.icon} />
        <View justifyContent={"space-around"}>
          <Text style={styles.meatName}>{item.animal}</Text>
          <Text style={styles.meatQuantity}>{item.quantity}</Text>
        </View>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
};

/**
 * Section header
 *
 * @param {*} { section: { title } }
 * @returns
 */
renderSection = ({ section: { date } }) => {
  return <Text style={styles.sectionHeader}>{date}</Text>;
};

/**
 * Custom key extractor
 *
 * @param {*} item
 * @param {*} index
 */
keyExtractor = (item, index) => index.toString();
export default List;

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    flexDirection: "row",
    height: 75,
    justifyContent: "space-between",
    width,
    alignItems: "center",
    padding: 8
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 15,
    backgroundColor: "#00000010"
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: "contain"
  },
  meatView: {
    width: width * 0.35,
    flexDirection: "row"
  },
  meatName: {
    fontSize: 16,
    paddingLeft: 15,
    fontWeight: "bold"
  },
  meatQuantity: {
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 15
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
