import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.props.flipCellsAroundMe();
  }
  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
    return <td onClick={this.clickHandler} className={classes}></td>;
  }
}

export default Cell;
