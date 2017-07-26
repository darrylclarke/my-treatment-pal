import React, { Component } from 'react';
import './arrow-bar.css';
import { Glyphicon } from 'react-bootstrap';

class ArrowBar extends Component {
  clickLeft() {
    this.props.changePage(-1);
  }

  clickRight() {
    this.props.changePage(+1);
  }

  render() {
    return (
      <div className={'arrow-bar ' + this.props.innerClass}>
        {!this.props.isFirst &&
          <button onClick={this.clickLeft.bind(this)} className="arrow-bar__left">
            <Glyphicon glyph="hand-left" />
          </button>}
        {!this.props.isLast &&
          <button onClick={this.clickRight.bind(this)} className="arrow-bar__right">
            <Glyphicon glyph="hand-right" />
          </button>}
      </div>
    );
  }
}

export default ArrowBar;
