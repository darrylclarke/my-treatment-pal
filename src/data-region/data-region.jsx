import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../shared/Container';
import './data-region.css';

const propTypes = {
  data: PropTypes.array.isRequired
};

class DataRegion extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="data-region">
        <p>add new</p>
        <p>list of old </p>
        <p>list of old </p>
        <p>list of old </p>
        <p>list of old </p>
        <p>list of old </p>
      </div>
    );
  }
}

DataRegion.propTypes = propTypes;

export default DataRegion;
