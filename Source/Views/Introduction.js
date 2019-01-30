import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import SafeAreaWrapper from "../Components/SafeAreaWrapper";
import { Navigation } from "react-native-navigation";
import { tabs } from "../../index";
/**
 *
 *
 * @class Introduction
 * @extends {Component}
 */
class Introduction extends Component {
  /**
   *Creates an instance of Introduction.
   * @param {*} props
   * @memberof Introduction
   */
  constructor(props) {
    super(props);
  }

  // MARK: - Actions
  /**
   * Navigate to dash board.
   *
   * @memberof Introduction
   */
  navigateToDashBoard = () => {
    console.log(this.props);
    // Navigation.push("tabs", {
    //   component: {
    //     name: "dashboard",
    //     passProps: {
    //       text: "Pushed screen"
    //     },
    //     options: {
    //       topBar: {
    //         title: {
    //           text: "DashBoard",
    //           color: "#f4d766",
    //           fontSize: 20,
    //           fontWeight: "900"
    //         },
    //         background: {
    //           color: "#000"
    //         },
    //         backButton: {
    //           color: "#fff"
    //         },
    //         visible: true
    //       }
    //     }
    //   }
    // });
    tabs();
  };

  /**
   *
   *
   * @returns
   * @memberof Introduction
   */
  render() {
    return (
      <SafeAreaWrapper>
        <Text style={styles.heading}>Meat Journal</Text>
        <Image
          source={require("../../Assets/meat_icon.png")}
          style={styles.logo}
        />
        <Text style={styles.description}>Keep track of the meat you eat</Text>
        <TouchableOpacity onPress={this.navigateToDashBoard}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get started</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaWrapper>
    );
  }
}

const mapStateToProps = state => ({
  default: state.reducer
});

export default connect(mapStateToProps)(Introduction);

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4d766",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    color: "#000",
    height: 44,
    fontSize: 30,
    fontWeight: "500",
    width: height * 0.25,
    textAlign: "center"
  },
  description: {
    color: "#000",
    fontSize: 20,
    fontWeight: "200",
    width: height * 0.25,
    textAlign: "center"
  },
  logo: {
    height: height * 0.25,
    width: height * 0.25,
    resizeMode: "contain"
  },
  button: {
    height: 44,
    width: height * 0.25,
    backgroundColor: "#000",
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
});
