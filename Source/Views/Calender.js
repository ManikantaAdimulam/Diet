import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Dimensions
} from "react-native";
import { CalendarList } from "react-native-calendars";
import List from "../Components/List";
import { connect } from "react-redux";
import SafeAreaWrapper from "../Components/SafeAreaWrapper";
import { Navigation } from "react-native-navigation";
import moment from "moment";

/**
 *
 *
 * @class Calender
 * @extends {Component}
 */
class Calender extends Component {
  /**
   *Creates an instance of Calender.
   * @param {*} props
   * @memberof Calender
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  /**
   *
   *
   * @param {*} day
   * @memberof Calender
   */
  onDayPress = date => {
    const { day, month, year, timestamp } = date;
    this.showOverlay(
      "Add Entry",
      {
        date: moment(timestamp).format("DD MMM YYYY")
      },
      "Add"
    );
  };

  /**
   *
   * @param {*} title
   * @param {*} props
   * @memberof Calender
   */
  showOverlay = (title, props, buttonTitle) => {
    Navigation.showOverlay({
      component: {
        name: "logEntry",
        animate: true,
        passProps: {
          title: title,
          data: props,
          buttonTitle: buttonTitle
        },
        options: {
          screenBackgroundColor: "transparent",
          modalPresentationStyle: "pageSheet",
          layout: {
            backgroundColor: "transparent"
          },
          topBar: {
            visible: false,
            animate: true,
            elevation: 0,
            noBorder: true
          }
        }
      }
    });
  };

  /**
   *
   *
   * @memberof Calender
   */
  onEntryClick = data => {
    let newObj = data;
    newObj.date = moment(data.date * 1000).format("DD MMM YYYY");
    this.showOverlay("Edit Entry", newObj, "Save");
  };

  /**
   *
   *
   * @returns
   * @memberof Calender
   */
  render() {
    const { data } = this.props.list;
    const date = new Date();
    const today = moment(date).format("DD MMM YYYY");
    const list = data.filter(item => {
      return item.date * 1000 === moment(today).valueOf();
    });
    const markedDate = {
      [this.state.selected]: {
        selected: true,
        marked: true,
        disableTouchEvent: true,
        selectedDotColor: "orange"
      }
    };
    return (
      <SafeAreaWrapper style={styles.container}>
        <CalendarList
          onDayPress={day => {
            this.onDayPress(day);
          }}
          pastScrollRange={0}
          futureScrollRange={1}
          style={styles.calendar}
          hideExtraDays
          monthFormat={"ddd MMM yyyy"}
          markedDates={markedDate}
          minDate={new Date()}
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          ///
          hideArrows={false}
          ///
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "gray",
            selectedDayBackgroundColor: "#f4d711",
            selectedDayTextColor: "#fff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            "stylesheet.day.basic": {
              text: {
                marginTop: Platform.OS === "android" ? 4 : 6,
                fontSize: 15,
                fontWeight: "500",
                color: "#000",
                backgroundColor: "rgba(255, 255, 255, 0)"
              }
            },
            "stylesheet.calendar.header": {
              dayHeader: {
                marginTop: 2,
                marginBottom: 7,
                width: 32,
                textAlign: "center",
                fontSize: 13,
                color: "gray",
                fontWeight: "800"
              }
            },
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "#000",
            monthTextColor: "gray",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
        <View style={{ height: height * 0.35 }}>
          {data.length > 0 && <List list={list} onPress={this.onEntryClick} />}
        </View>
      </SafeAreaWrapper>
    );
  }
}

///
const mapStateToProps = state => ({ list: state.listReducer });
///
const { height, width } = Dimensions.get("window");
///
export default connect(mapStateToProps)(Calender);
///
const styles = StyleSheet.create({
  calendar: {
    height: height * 0.6,
    backgroundColor: "red"
  },
  container: {
    flex: 1
  }
});
