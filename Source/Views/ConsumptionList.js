import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import List from "../Components/List";

class ConsumptionList extends Component {
  render() {
    return <List list={this.props.list.data} />;
  }
}

const mapStateToProps = state => ({ list: state.listReducer });

export default connect(mapStateToProps)(ConsumptionList);
