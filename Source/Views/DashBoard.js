import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import Calender from "./Calender";
import ConsumptionList from "./ConsumptionList";
import { fetchDataFromDB } from "../DataBase/SQLite";
import { setInitialData, addNewEntry } from "../Redux/Actions/Actions";
const { width } = Dimensions.get("window");
/**
 *
 *
 * @class DashBoard
 * @extends {Component}
 */
class DashBoard extends Component {
  /**
   * Creates an instance of DashBoard.
   * @param {*} props
   * @memberof DashBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  /**
   * Life cycle method
   *
   * @memberof DashBoard
   */
  componentDidMount() {
    fetchDataFromDB(
      "",
      success => {
        this.manipulateData(success);
      },
      error => {}
    );
  }

  /**
   * Manipulating array for storing.
   *
   * @param {*} data
   */
  manipulateData = data => {
    const { dispatch } = this.props;
    data.forEach(item => {
      let entry = { date: "", data: [] };
      entry.date = item["Date"];
      delete item.date;
      entry.data = [item];
      dispatch(addNewEntry(entry));
    });
  };
  /**
   *
   *
   * @param {*} ref
   */
  scrollableTabBarRef = ref => {
    this.scrollableTabBar = ref;
  };

  /**
   *
   *
   * @returns
   * @memberof DashBoard
   */
  render() {
    return (
      <View flex={1}>
        <ScrollableTabView
          initialPage={0}
          page={this.state.selected}
          renderTabBar={() => (
            <ScrollableTabBar
              style={styles.scrollableTabBar}
              textStyle={styles.tabBarTextStyles}
              underlineStyle={styles.underlineStyles}
            />
          )}
        >
          <ConsumptionList tabLabel={"List"} />
          <Calender tabLabel={"Calender"} />
        </ScrollableTabView>
        <View style={styles.floatingButtonView}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ selected: 1 });
            }}
          >
            <View style={styles.floatingButton}>
              <Text style={styles.buttonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

/**
 *
 *
 * @param {*} state
 */
const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DashBoard);

const styles = StyleSheet.create({
  floatingButtonView: {
    borderRadius: 25,
    bottom: 25,
    height: 50,
    position: "absolute",
    justifyContent: "center",
    right: 25,
    width: 50,
    alignItems: "center"
  },
  floatingButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  buttonText: {
    color: "#ffec60",
    fontSize: 25,
    fontWeight: "500"
  },
  scrollableTabBar: {
    backgroundColor: "#000000",
    height: 30
  },
  tabBarTextStyles: {
    color: "#ffec60",
    fontSize: 17,
    top: -15
  },
  underlineStyles: {
    backgroundColor: "#ffec60",
    height: 4
  }
});
