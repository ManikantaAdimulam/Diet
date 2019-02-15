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

/**
 * Gradient layer
 */
const Gradient = () => (
  <SVG.G>
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
  </SVG.G>
);
///
const CUT_OFF = 50;

/**
 * Labels on graph.
 *
 * @param {*} { x, y, bandwidth, data }
 * @returns
 */
function Labels({ x, y, bandwidth, data }) {
  return data.map((value, index) => {
    return (
      <SVG.Text
        key={index}
        x={0}
        y={getY(y, index)}
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

/**
 * Calculating total weight consumed.
 *
 * @param {*} data
 * @returns
 */
function totalWeightConsumed(data) {
  let consumedWeight = 0;
  if (data.length > 0) {
    data.forEach(item => {
      consumedWeight += item.Quantity;
    });
  }
  return consumedWeight;
}

/**
 * Get y value
 *
 * @param {*} y
 * @param {*} index
 * @returns
 */
function getY(y, index) {
  return y(index) - 12;
}

/**
 * Statistics view
 *
 * @param {*} {
 *   tab,
 *   list,
 *   dateRange,
 *   onPreviousPress,
 *   onNextPress
 * }
 * @returns
 */
const StatisticsView = ({
  tab,
  list,
  dateRange,
  onPreviousPress,
  onNextPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataRangeView}>
        <TouchableOpacity onPress={onPreviousPress}>
          <Image source={{ uri: "previous" }} style={styles.icons} />
        </TouchableOpacity>
        <Text style={styles.dateRangeText}>{dateRange}</Text>
        <TouchableOpacity onPress={onNextPress}>
          <Image source={{ uri: "next" }} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View style={styles.dataView}>
        <Text style={styles.consumedText}>Weight consumed</Text>
        <Text style={styles.consumedValuedText}>
          {totalWeightConsumed(list)}gm
        </Text>
      </View>
      <View style={styles.barChart}>
        {list.length > 0 && (
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
            yAccessor={({ item }) => parseInt(item.Quantity)}
          >
            <Gradient />
            <Labels />
          </BarChart>
        )}
      </View>
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
    height: height * 0.3,
    top: 15
  },
  dataRangeView: {
    height: 44,
    width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: 15
  },
  icons: {
    height: 20,
    width: 20,
    resizeMode: "center"
  },
  dateRangeText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  dataView: {
    height: 34,
    width: width * 0.9,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    top: 25
  },
  consumedText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  consumedValuedText: {
    fontSize: 14,
    fontWeight: "200"
  }
});
