import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectedData } from '../shared/dataSource.js';
import './active-paragraph.css';

const propTypes = {
  text: PropTypes.string.isRequired
};

class ActiveParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = { normalParagraph: false };
  }

  get myPower() {
    return getSelectedData('personalize');
  }

  convertContent(item, index) {
    if (item === 'Spirit' || item === 'God' || item === 'god') {
      return <span key={index} className="my-power">{this.myPower}</span>;
    } else {
      return <span key={index} className="">{item}</span>;
    }
  }

  get splitInput() {
    return this.props.text.split('~');
  }

  get content() {
    if (this.props.text.indexOf('~') === -1) {
      return this.props.text;
    }
    return this.splitInput.map((item, index) => this.convertContent(item, index));
  }

  render() {
    return (
      <p className="paragraph">
        {this.content}
      </p>
    );
  }
}

ActiveParagraph.propTypes = propTypes;

export default ActiveParagraph;
