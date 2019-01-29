import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  Image
} from "react-native";
import { connect } from "react-redux";

class List extends Component {
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
        <Image source={icon} style={{ height: 50, width: 50 }} />
        <Text>{item.animal}</Text>
        <Text>{item.quantity}</Text>
        <Text>{item.time}</Text>
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

  /**
   *
   *
   * @returns
   * @memberof List
   */
  render() {
    console.log(this.props.list);
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.props.list.data}
          renderSectionHeader={this.renderSection}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ list: state.listReducer });

export default connect(mapStateToProps)(List);

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    flexDirection: "row",
    height: 64,
    justifyContent: "space-between",
    borderRadius: 5,
    width,
    alignItems: "center",
    padding: 8
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 10,
    borderColor: "#000",
    paddingLeft: 15,
    height: 44,
    justifyContent: "center"
  }
});
