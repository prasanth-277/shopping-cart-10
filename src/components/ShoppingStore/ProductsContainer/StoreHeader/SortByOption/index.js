import React, { Component } from "react";
import "./style.css";
export default class SortByOption extends Component {
  displayOptions = () => {
    return this.props.sortByOptions.map(element => (
      <option value={element.value}>{element.label}</option>
    ));
  };
  changeSortFilter = e => {
    this.props.productStore.changeSortFilter(e.target.value);
  };
  render() {
    return (
      <div>
        <span>Order by </span>
        <select onChange={this.changeSortFilter} className="dropDown">
          <option value="" disabled selected>
            Select
          </option>
          {this.displayOptions()}
        </select>
      </div>
    );
  }
}