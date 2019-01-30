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
const { width } = Dimensions.get("window");
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
  }

  scrollableTabBarRef = ref => {
    this.scrollableTabBar = ref;
  };

  render() {
    return (
      <View flex={1}>
        <ScrollableTabView
          initialPage={0}
          page={this.state.selected}
          renderTabBar={() => (
            <ScrollableTabBar
              style={{
                backgroundColor: "#000",
                height: 30
              }}
              textStyle={{
                color: "#f4d766",
                fontSize: 17,
                top: -15
              }}
              underlineStyle={{
                backgroundColor: "#f4d766",
                height: 4
              }}
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(DashBoard);

const styles = StyleSheet.create({
  floatingButtonView: {
    height: 50,
    width: 50,
    position: "absolute",
    bottom: 25,
    right: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  floatingButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  buttonText: {
    color: "#f4d766",
    fontSize: 25,
    fontWeight: "500"
  }
});
