import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import Picker from "react-native-picker";
import { connect } from "react-redux";
import { updateSettings } from "../Redux/Actions/Actions";
/**
 * Menu
 *
 * @param {*} { data }
 * @returns
 */
class MenuList extends PureComponent {
  /**
   * UI
   *
   * @returns
   * @memberof MenuList
   */
  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
      />
    );
  }
  /**
   * Menu cell
   *
   * @param {*} { item: { key, value } }
   * @returns
   */
  renderItem = ({ item: { key, value } }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.openPicker(key);
        }}
      >
        <View style={styles.item}>
          <View style={styles.optionsView}>
            <Text style={styles.cellTitle}>{key}</Text>
            {value != "" && <Text style={styles.cellSubTitle}>{value}</Text>}
          </View>
          <Image source={{ uri: "next.png" }} style={styles.nextButton} />
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * To form time list
   *
   * @memberof MenuList
   */
  time = () => {
    var arr = [];
    var hours = [];
    var mins = [];
    var session = ["AM", "PM"];
    for (i = 1; i <= 12; i++) {
      hours.push(i);
    }
    for (var j = 0; j <= 60; j++) {
      mins.push(("0" + j).slice(-2));
    }
    arr.push(hours, mins, session);
    return arr;
  };

  /**
   * To open picker with particular key data.
   *
   * @param {*} key
   * @returns
   */
  openPicker = key => {
    const { updateSettingValue, callBack } = this.props;
    let pickerData = [];
    switch (key) {
      case "Weight":
        pickerData = ["gm", "kg"];
        break;
      case "Remainder":
        pickerData = this.time();
        break;
      case "Theme":
        pickerData = ["Dark", "Light"];
        break;
      default:
        return;
    }
    Picker.init({
      pickerData: pickerData,
      pickerTitleText: "Please select",
      pickerConfirmBtnText: "Done",
      pickerTitleColor: [255, 236, 96, 1],
      pickerToolBarFontSize: 16,
      pickerFontSize: 16,
      pickerBg: [100, 100, 100, 1],
      pickerCancelBtnColor: [255, 255, 255, 1],
      pickerConfirmBtnColor: [255, 255, 255, 1],
      pickerToolBarBg: [120, 120, 120, 1],
      pickerFontColor: [255, 236, 96, 1],
      onPickerConfirm: (pickedValue, pickedIndex) => {
        let value = "";
        if (key === "Remainder") {
          value =
            `${pickedValue[0]}:` + `${pickedValue[1]}` + ` ${pickedValue[2]}`;
        } else {
          value += `${pickedValue[0]}`;
        }
        updateSettingValue(key, value);
        if (key === "Theme") {
          callBack(key, value);
        }
      },
      onPickerCancel: (pickedValue, pickedIndex) => {},
      onPickerSelect: (pickedValue, pickedIndex) => {}
    });
    Picker.show();
  };
}
///
const styles = StyleSheet.create({
  item: {
    padding: 8,
    fontSize: 18,
    height: 60,
    flexDirection: "row"
  },
  separator: {
    height: 1,
    width,
    backgroundColor: "lightgray"
  },
  cellTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  cellSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "gray"
  },
  nextButton: {
    height: 44,
    width: 44,
    resizeMode: "center"
  },
  optionsView: {
    flex: 1,
    justifyContent: "space-evenly"
  }
});
///
const { height, width } = Dimensions.get("window");

///
const mapDispatchToProps = dispatch => ({
  updateSettingValue: (key, value) => {
    dispatch(updateSettings(key, value));
  }
});

///
const mapStateToProps = state => ({ settings: state.SettingsReducer });
///
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuList);
