import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { BarChart } from "react-native-svg-charts";
import * as SVG from "react-native-svg";
import { connect } from "react-redux";
const Gradient = () => (
  <SVG.Defs key={"gradient"}>
    <SVG.LinearGradient
      id={"gradient"}
      x1={"50%"}
      y={"100%"}
      x2={"0%"}
      y2={"100%"}
    >
      <SVG.Stop offset={"0%"} stopColor={"rgb(220, 0, 0)"} />
      <SVG.Stop offset={"100%"} stopColor={"rgb(0, 0, 0)"} />
    </SVG.LinearGradient>
  </SVG.Defs>
);
const CUT_OFF = 50;
function Labels({ x, y, bandwidth, data }) {
  return data.map((value, index) => {
    console.log(index);
    return (
      <SVG.Text
        x={0}
        y={0} //y(index) - 12
        fontSize={14}
        fontWeight={"bold"}
        fill={"black"}
        alignmentBaseline={"middle"}
      >
        {value.Animal}
      </SVG.Text>
    );
  });
}
///
const StatisticsView = ({
  tab,
  list,
  onPreviousPress,
  onNextPress,
  totalData
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataRangeView}>
        <TouchableOpacity onPress={onPreviousPress}>
          <Image source={{ uri: "previous" }} style={styles.icons} />
        </TouchableOpacity>
        <Text style={styles.dateRangeText}>Date Range</Text>
        <TouchableOpacity onPress={onNextPress}>
          <Image source={{ uri: "next" }} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View style={styles.dataView}>
        <Text style={styles.consumedText}>Weight consumed</Text>
        <Text style={styles.consumedValuedText}>30kg</Text>
      </View>
      {list.length > 0 && (
        <View style={styles.barChart}>
          <BarChart
            animate={true}
            style={styles.barChart}
            data={list}
            horizontal={true}
            svg={{
              fill: "url(#gradient)"
            }}
            contentInset={{ top: 10, bottom: 10 }}
            spacingInner={0.7}
            gridMin={0}
            spacingOuter={0.7}
            yAccessor={({ item }) =>
              parseInt(item.Quantity.replace(/[^\d.]/g, ""))
            }
          >
            <Gradient />
            <Labels />
          </BarChart>
        </View>
      )}
    </View>
  );
};
///
const mapStateToProps = state => ({ totalData: state.listReducer });
///
export default connect(mapStateToProps)(StatisticsView);
///
const { width, height } = Dimensions.get("window");
///
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  barChart: {
    width: width * 0.9,
    height: height * 0.25
  },
  dataRangeView: {
    height: 44,
    width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  icons: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  dateRangeText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  dataView: {
    height: 44,
    width: width * 0.9,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray"
  },
  consumedText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  consumedValuedText: {
    fontSize: 14,
    fontWeight: "500"
  }
});
