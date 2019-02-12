import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  Image,
  TouchableOpacity
} from "react-native";
import _ from "lodash";
import moment from "moment";
/**
 *
 *
 * @class List
 * @extends {Component}
 */
class List extends Component {
  /**
   * Section header
   *
   * @param {*} { section: { title } }
   * @returns
   */
  renderSection = ({ section: { date } }) => {
    return (
      <Text style={styles.sectionHeader}>
        {moment(date * 1000).format("DD MMM YYYY")}
      </Text>
    );
  };

  /**
   * Custom key extractor
   *
   * @param {*} item
   * @param {*} index
   */
  keyExtractor = (item, index) => index.toString();
  /**
   * Section Item
   *
   * @memberof List
   */
  renderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.onPressItem(item)}>
        <View style={styles.card}>
          <View style={styles.meatView}>
            <Image
              source={{ uri: item.Animal.toLowerCase() }}
              style={styles.icon}
            />
            <View justifyContent={"space-around"}>
              <Text style={styles.meatName}>{item.Name}</Text>
              <Text style={styles.meatQuantity}>{item.Quantity}</Text>
            </View>
          </View>
          <Text style={styles.timeText}>{item.Time}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //
  onPressItem = item => {
    const { list } = this.props;
    const { date } = list[0];
    const { onPress } = this.props;
    if (onPress != undefined) {
      item.date = date;
      onPress(item);
    }
  };
  /**
   *
   *
   * @returns
   * @memberof List
   */
  render() {
    const { list } = this.props;
    const sorted = list.sort(function(a, b) {
      return a.date - b.date;
    });
    return (
      <View style={styles.container}>
        <SectionList
          sections={sorted}
          renderSectionHeader={this.renderSection}
          renderItem={({ item }) => {
            return this.renderItem(item);
          }}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
export default List;
///
const { height, width } = Dimensions.get("window");
///
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
