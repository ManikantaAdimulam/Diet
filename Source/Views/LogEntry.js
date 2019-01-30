import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import SafeAreaWrapper from "../Components/SafeAreaWrapper";

class LogEntry extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.floatingButton}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(LogEntry);
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: height * 0.6,
    width,
    backgroundColor: "red",
    top: height * 0.4,
    alignItems: "center"
  },
  floatingButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    top: -58
  }
});
