import React, { Component } from "react";
import { Text, StyleSheet, ScrollView, View, Platform } from "react-native";
import { Calendar } from "react-native-calendars";

export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={this.onDayPress}
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
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderColor: "#eee",
    height: 350
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
