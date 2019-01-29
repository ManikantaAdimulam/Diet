import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import List from "./List";
import Calender from "./Calender";

class DashBoard extends Component {
  render() {
    return (
      <View flex={1}>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{
                backgroundColor: "#000"
              }}
              textStyle={{
                color: "#f4d766",
                fontSize: 17
              }}
              underlineStyle={{
                backgroundColor: "#f4d766",
                height: 4
              }}
              contentProps={{}}
            />
          )}
        >
          <List tabLabel={"List"} />
          <Calender tabLabel={"Calender"} />
        </ScrollableTabView>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DashBoard);
