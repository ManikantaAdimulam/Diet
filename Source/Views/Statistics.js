import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import { connect } from "react-redux";
import MenuItem from "../Components/MenuItem";
import StatisticsView from "../Components/StatisticsView";
import { Utilities } from "../Utilities/Utilities";
import { fetchDataForDateRage } from "../ViewModals/DBViewModal";
import moment from "moment";
import { Navigation } from "react-native-navigation";

const titles = ["Weekly", "Monthly", "Yearly"];
/**
 *
 *
 * @class Statistics
 * @extends {Component}
 */
class Statistics extends Component {
  /**
   * Creates an instance of Statistics.
   * @param {*} props
   * @memberof Statistics
   */
  constructor(props) {
    super(props);
    this.state = {
      left: new Animated.Value(0),
      toValue: 0,
      selectedIndex: new Animated.Value(0),
      tabSelected: true,
      index: 0,
      statisticsData: []
    };
  }

  /**
   * Life cycle method.
   *
   * @memberof Statistics
   */
  componentDidMount() {
    const { list } = this.props;
    this.state.selectedIndex.addListener(data => {
      if (this.state.index != data.value) {
        this.setState({ index: data.value });
      }
    });
    this.bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex === 1) {
          this.initializeChart();
        }
      }
    );
  }

  /**
   *
   *
   * @memberof Statistics
   */
  componentWillUnmount() {
    this.state.selectedIndex.removeListener();
    this.bottomTabEventListener.removeListener();
  }

  /**
   * On selecting tab from tab bar
   *
   * @param {*} index
   * @memberof TabBar
   */
  onClick = index => {
    const presentIndex = index;
    Animated.timing(this.state.left, {
      toValue: index * (width / titles.length),
      duration: 150
    }).start();
    this.state.selectedIndex.setValue(presentIndex);
  };

  /**
   *
   *
   * @memberof Statistics
   */
  initializeChart = () => {
    const date = new Date();
    const startDate = moment(date).format("DD MMM YYYY");
    const nextWeekDay = Utilities.nextDay(startDate, "week");
    const endDate = moment(nextWeekDay).format("DD MMM YYYY");
    this.getChartData(startDate, endDate);
  };

  /**
   *
   *
   * @param {*} startDate
   * @param {*} endDate
   */
  getChartData = (startDate, endDate) => {
    fetchDataForDateRage(
      startDate,
      endDate,
      result => {
        console.log("result", result);
        this.setState({ statisticsData: result });
      },
      error => {
        // console.log(error, "error");
      }
    );
  };

  /**
   *
   *
   * @returns
   * @memberof Statistics
   */
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.menuBar}>
            <View style={styles.menuBarItemsView}>
              {titles.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.scrollableTabBar,
                      { width: width / titles.length }
                    ]}
                    key={index.toString()}
                  >
                    <MenuItem
                      item={item}
                      onPress={() => this.onClick(index)}
                      key={index.toString()}
                      isSelected={this.state.index}
                      index={index}
                      key={index.toString()}
                    />
                  </View>
                );
              })}
            </View>
            <Animated.View
              style={[
                styles.underLayer,
                {
                  marginLeft: this.state.left,
                  width: width / titles.length
                }
              ]}
            />
          </View>
        </View>
        {this.state.statisticsData.length > 0 && (
          <StatisticsView list={this.state.statisticsData} />
        )}
        <TouchableOpacity>
          <Image source={{ uri: "settings" }} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({ list: state.listReducer });

export default connect(mapStateToProps)(Statistics);
///
const { width } = Dimensions.get("window");
///
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end"
  },
  scrollableTabBar: {
    backgroundColor: "#000000",
    height: 40
  },
  menuBarItemsView: {
    height: 36,
    width,
    backgroundColor: "#000",
    flexDirection: "row"
  },
  underLayer: {
    height: 4,
    backgroundColor: "#f4d766"
  },
  settingsIcon: {
    height: 50,
    width: 50,
    bottom: 25,
    right: 25
  }
});
