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
///
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
      statisticsData: [],
      dateRange: "",
      rangeStartDate: "",
      rangeEndDate: "",
      period: ""
    };
    this.onNextPress = this.onNextPress.bind(this);
    this.onPreviousPress = this.onPreviousPress.bind(this);
    this.onSettingsPress = this.onSettingsPress.bind(this);
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
    let period = "";
    switch (presentIndex) {
      case 1:
        period = "month";
        break;
      case 2:
        period = "year";
        break;
      default:
        period = "week";
    }
    this.setState({ period });
    this.initializeChart();
  };

  /**
   *
   *
   * @memberof Statistics
   */
  initializeChart = () => {
    const date = moment(new Date()).format("DD MMM YYYY");
    const startDate = moment(date).valueOf();
    this.setState({ rangeStartDate: startDate }, () => {
      const nextWeekDay = Utilities.nextDay(startDate, this.state.period);
      const endDate = moment(nextWeekDay).valueOf();
      this.setState({ rangeEndDate: endDate }, () => {
        this.getChartData(this.state.rangeStartDate, this.state.rangeEndDate);
      });
    });
  };

  /**
   *
   *
   * @param {*} startDate
   * @param {*} endDate
   */
  getChartData = (startDate, endDate) => {
    const dateFormat = this.state.period === "year" ? "MMM YYYY" : "MMM DD";
    fetchDataForDateRage(
      startDate,
      endDate,
      result => {
        this.setState({
          statisticsData:
            result.length > 0 ? this.updateDataForStatistics(result) : [],
          dateRange:
            moment(new Date(startDate)).format(dateFormat) +
            "-" +
            moment(new Date(endDate)).format(dateFormat)
        });
      },
      error => {}
    );
  };

  /**
   * To change statistics data compatible to Bar chart
   *
   * @memberof Statistics
   */
  updateDataForStatistics = data => {
    var newData = [data[0]];
    data.forEach(column => {
      var isExistedDate = false;
      newData.forEach((item, index) => {
        if (item.Animal.toLowerCase() === column.Animal.toLowerCase()) {
          isExistedDate = true;
          newData[index].Quantity =
            parseInt(newData[index].Quantity) +
            parseInt(column.Quantity.replace(/[^\d.]/g, ""));
        }
      });
      if (!isExistedDate) {
        const newObj = column;
        newObj.Quantity = parseInt(column.Quantity.replace(/[^\d.]/g, ""));
        newData.push(column);
      }
    });
    return newData;
  };

  /**
   * On next week/Month/Year press
   *
   * @memberof Statistics
   */
  onNextPress = () => {
    let date = new Date(this.state.rangeEndDate);
    const startDate = date.setDate(date.getDate() + 1);
    const endDate = moment(
      Utilities.nextDay(startDate, this.state.period)
    ).valueOf();
    this.setState({ rangeStartDate: startDate, rangeEndDate: endDate }, () => {
      this.getChartData(this.state.rangeStartDate, this.state.rangeEndDate);
    });
  };

  /**
   * On previous week/Month/Year press
   *
   * @memberof Statistics
   */
  onPreviousPress = () => {
    const startDate =
      moment(
        Utilities.nextDay(this.state.rangeStartDate, this.state.period, false)
      ).valueOf() -
      24 * 60 * 60 * 1000;
    const endDate = moment(
      Utilities.nextDay(startDate, this.state.period)
    ).valueOf();
    this.setState({ rangeStartDate: startDate, rangeEndDate: endDate }, () => {
      this.getChartData(this.state.rangeStartDate, this.state.rangeEndDate);
    });
  };
  //  modalPresentationStyle: 'overCurrentContext', // Supported styles are: 'formSheet', 'pageSheet', 'overFullScreen', 'overCurrentContext', 'currentContext', 'popOver', 'fullScreen' and 'none'. On Android, only overCurrentContext and none are supported.

  onSettingsPress = () => {
    Navigation.push("tabs", {
      component: {
        name: "settings",
        animate: true,
        options: {
          screenBackgroundColor: "#ffffff",
          layout: {
            backgroundColor: "#ffffff"
          },
          topBar: {
            visible: true,
            animate: false, // Controls whether TopBar visibility changes should be animated
            // hideOnScroll: true,
            backButton: {
              color: "#fff",
              title: "Settings"
            },
            background: {
              color: "#000"
            }
          }
        }
      }
    });
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

        <StatisticsView
          list={this.state.statisticsData}
          dateRange={this.state.dateRange}
          onNextPress={this.onNextPress}
          onPreviousPress={this.onPreviousPress}
        />
        <TouchableOpacity onPress={this.onSettingsPress}>
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
    backgroundColor: "#ffec60"
  },
  settingsIcon: {
    height: 50,
    width: 50,
    bottom: 25,
    right: 25
  }
});
