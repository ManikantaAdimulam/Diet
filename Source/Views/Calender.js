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

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    console.log(this.props);
    return (
      <SafeAreaWrapper style={styles.container}>
        <CalendarList
          onDayPress={day => {
            this.onDayPress(day);
          }}
          style={styles.calendar}
          hideExtraDays
          monthFormat={"ddd MMM yyyy"}
          markedDates={{
            [this.state.selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange"
            }
          }}
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
            selectedDayTextColor: "#000",
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
          <List list={[this.props.list.data[0]]} />
        </View>
      </SafeAreaWrapper>
    );
  }

  onDayPress(day) {
    // this.setState({
    //   selected: day.dateString
    // });
    console.log("overlay");
    Navigation.showOverlay({
      component: {
        name: "logEntry",
        animate: true,
        options: {
          screenBackgroundColor: "transparent",
          modalPresentationStyle: "pageSheet",
          topBar: {
            visible: false
          }
        }
      }
    });
  }
}
const mapStateToProps = state => ({ list: state.listReducer });
const { height, width } = Dimensions.get("window");
export default connect(mapStateToProps)(Calender);
const styles = StyleSheet.create({
  calendar: {
    height: height * 0.6,
    backgroundColor: "red"
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee"
  },
  container: {
    flex: 1
  }
});
