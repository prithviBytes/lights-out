import React, { Component } from "react";
import "./Board.css";
import Cell from "./Cell";

class Board extends Component {
  static defaultProps = {
    numRows: 5,
    numCols: 5,
    chanceCellLitOnStart: 0.25
  };
  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
      hasWon: false
    };
  }
  // Creating Board
  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.numCols; y++) {
      let row = [];
      for (let x = 0; x < this.props.numRows; x++) {
        row.push(Math.random() < this.props.chanceCellLitOnStart);
      }
      board.push(row);
    }
    return board;
  }
  //Flipping Cell and the cells around it
  flipCellsAround(coordinate) {
    let [y, x] = coordinate.split("-").map(Number);
    let { numRows, numCols } = this.props;
    let board = this.state.board;

    function flipCell(y, x) {
      if (x >= 0 && x < numCols && y >= 0 && y < numRows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    let hasWon = board.every((row) => row.every((cell) => !cell));
    this.setState({ board: board, hasWon: hasWon });
  }
  render() {
    if (this.state.hasWon) {
      return (
        <div>
          <div id="message" className="neon-orange">
            You
          </div>
          <div id="message" className="neon-blue">
            Win!
          </div>
        </div>
      );
    }

    let tableBoard = [];
    for (let y = 0; y < this.props.numCols; y++) {
      let row = [];
      for (let x = 0; x < this.props.numRows; x++) {
        let coordinate = `${y}-${x}`;
        row.push(
          <Cell
            key={coordinate}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coordinate)}
          />
        );
      }
      tableBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
