import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import { addNewEntry, editEntry } from "../Redux/Actions/Actions";
import { updateData } from "../DataBase/SQLite";
import { insertDataIntoDB } from "../ViewModals/DBViewModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import moment from "moment";
import Picker from "react-native-picker";
import _ from "lodash";
/**
 *
 *
 * @class LogEntry
 * @extends {Component}
 */
class LogEntry extends Component {
  /**
   *Creates an instance of LogEntry.
   * @param {*} props
   * @memberof LogEntry
   */
  constructor(props) {
    super(props);
    this.closeButton = this.closeButton.bind();
    const { Animal, Quantity, Time, date } = props.data;
    this.state = {
      top: new Animated.Value(height),
      animal: Animal || "",
      name: Animal || "",
      quantity: Quantity || "",
      time: Time || "",
      fields: [
        { key: "Name", value: Animal || "" },
        { key: "Animal", value: Animal || "" },
        { key: "Quantity", value: Quantity || "" },
        { key: "Date", value: date || "" },
        { key: "Time", value: Time || "" }
      ]
    };
    this.entryInput = this.entryInput.bind(this);
    this.onAddOrEditEntryClick = this.onAddOrEditEntryClick.bind(this);
    this.editingDidBegin = this.editingDidBegin.bind(this);
  }

  /**
   *
   *
   * @memberof LogEntry
   */
  componentDidMount() {
    Animated.timing(this.state.top, {
      toValue: 0,
      duration: 150
    }).start();
  }

  /**
   *
   *
   * @memberof LogEntry
   */
  closeButton = () => {
    Animated.timing(this.state.top, {
      toValue: height,
      duration: 100
    }).start();
    setTimeout(() => {
      Navigation.dismissOverlay(this.props.componentId);
    }, 200);
  };

  /**
   *
   *
   * @memberof LogEntry
   */
  onAddOrEditEntryClick = () => {
    let entry = { date: "", data: [] };
    const { dispatch, data, buttonTitle } = this.props;
    entry.date = moment(data.date).valueOf() / 1000;
    var object = this.state.fields.reduce(
      (obj, item) => ((obj[item.key] = item.value), obj),
      {}
    );
    object.Date = moment(data.date).valueOf() / 1000;
    entry.data = [object];
    if (buttonTitle === "Save") {
      updateData(entry, data.id, isSuccess => {
        if (isSuccess) {
          dispatch(editEntry(entry, data.id));
        }
      });
    } else {
      insertDataIntoDB(entry, isSuccess => {
        if (isSuccess) {
          dispatch(addNewEntry(entry));
        }
      });
    }
  };

  /**
   *
   *
   * @param {*} ref
   */
  inputRef = ref => (this.input = ref);

  /**
   *
   *
   * @memberof LogEntry
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
   *
   *
   * @memberof LogEntry
   */
  weights = () => {
    var arr = [];
    for (i = 0; i <= 500; i++) {
      arr.push(i * 5);
    }
    return arr;
  };

  /**
   *
   *
   * @memberof LogEntry
   */
  entryInput = (text, index) => {
    const { Settings } = this.props;
    const weightUnits =
      Settings.Weight === "gm" && index === 2
        ? text + "gm"
        : parseInt(text) / 1000 + "kg";
    this.state.fields[index].value = index === 2 ? weightUnits : text;
    switch (index) {
      case 0:
        this.setState({ name: text });
        break;
      case 1:
        this.setState({ animal: text });
        break;
      case 2:
        this.setState({ quantity: text + "gm" });
        break;
      case 3:
        this.setState({ date: text });
        break;
      case 4:
        this.setState({ time: text });
        break;
      default:
        break;
    }
  };

  /**
   *
   *
   * @param {*} { nativeEvent }
   * @param {*} index
   */
  editingDidBegin = ({ nativeEvent }, index) => {
    let pickerData = [];
    switch (index) {
      case 0:
        pickerData = [];
        break;
      case 1:
        pickerData = ["Cow", "Pig", "Sheep", "Goat", "Chicken", "Default"];
        break;
      case 2:
        pickerData = this.weights();
        break;
      case 3:
        break;
      case 4:
        pickerData = this.time();
        break;
      default:
        break;
    }
    Picker.isPickerShow(isOpened => {
      if (isOpened) {
        Picker.hide();
      }
    });
    if (pickerData.length > 0) {
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
          const text =
            pickedValue.length > 1
              ? `${pickedValue[0]}` +
                ":" +
                `${pickedValue[1]}` +
                ` ${pickedValue[2]}`
              : `${pickedValue[0]}`;
          this.entryInput(text, index);
        },
        onPickerCancel: (pickedValue, pickedIndex) => {},
        onPickerSelect: (pickedValue, pickedIndex) => {}
      });
      Picker.show();
    }
  };

  /**
   *
   *
   * @returns
   * @memberof LogEntry
   */
  render() {
    const { title, buttonTitle } = this.props;
    return (
      <KeyboardAwareScrollView style={[styles.container]}>
        <Animated.View
          style={[{ top: this.state.top }, styles.closeButtonView]}
        >
          <TouchableOpacity onPress={this.closeButton}>
            <Image
              source={{ uri: "down-arrow" }}
              style={styles.floatingButton}
            />
          </TouchableOpacity>
          <View style={styles.logView}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
            {this.state.fields.map((item, index) => {
              return (
                <FieldView
                  data={item}
                  onChangeText={this.entryInput}
                  onFocus={this.editingDidBegin}
                  key={item.key}
                  index={index}
                />
              );
            })}
            <TouchableOpacity onPress={this.onAddOrEditEntryClick}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAwareScrollView>
    );
  }
}

/**
 *
 *
 * @param {*} { data }
 * @returns
 */
const FieldView = ({ data, onChangeText, index, onFocus }) => {
  return (
    <View style={styles.fieldView}>
      <Text style={styles.fieldTitle}>{data.key}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={e => onChangeText(e, index)}
        onFocus={e => onFocus(e, index)}
        value={data.value}
      />
    </View>
  );
};

///
const mapStateToProps = state => ({ ...state.SettingsReducer });

///
export default connect(mapStateToProps)(LogEntry);

///
const { height, width } = Dimensions.get("window");

///
const styles = StyleSheet.create({
  container: {
    height,
    width,
    // alignItems: "center",
    backgroundColor: "#00000080"
  },
  header: {
    backgroundColor: "#000",
    height: 44,
    width: width - 16,
    justifyContent: "center",
    paddingLeft: 15
  },
  headerText: {
    color: "#f4d711",
    fontSize: 18,
    fontWeight: "500"
  },
  logView: {
    height: height * 0.8,
    width: width - 16,
    backgroundColor: "#fff",
    top: height * 0.29,
    borderColor: "lightgray",
    alignItems: "center",
    borderRadius: 5,
    overflow: "hidden"
  },
  closeButtonView: {
    alignItems: "center"
  },
  floatingButton: {
    height: 40,
    width: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.28
  },
  fieldTitle: {
    fontWeight: "700"
  },
  textInput: {
    borderWidth: 0.2,
    borderColor: "gray",
    backgroundColor: "#D3D3D330",
    width: width * 0.8,
    borderRadius: 5,
    height: 28,
    marginTop: 6,
    paddingLeft: 6,
    fontFamily: "Courier"
  },
  fieldView: {
    marginTop: 8
  },
  button: {
    height: 44,
    width: 160,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 25
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  }
});
