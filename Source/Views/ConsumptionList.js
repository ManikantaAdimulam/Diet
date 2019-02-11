import React, { Component } from "react";
import { connect } from "react-redux";
import List from "../Components/List";

/**
 *
 *
 * @class ConsumptionList
 * @extends {Component}
 */
const ConsumptionList = ({ list }) => {
  const { data } = list;
  return <List list={data} />;
};

///
const mapStateToProps = state => ({ list: state.listReducer });
///
export default connect(mapStateToProps)(ConsumptionList);
