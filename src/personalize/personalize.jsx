import React, { Component } from 'react';
import ContentPage from '../content-page';
import Container from '../shared/Container';
import PropTypes from 'prop-types';
import { getSelectedData } from '../shared/dataSource.js';
import './personalize.css';

const propTypes = {
  setup: PropTypes.array.isRequired
};

class Personalize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      myPower: getSelectedData(this.currentPage.page)
    };
  }

  get currentPage() {
    return this.props.setup[0];
  }

  get getSelectedData() {
    return getSelectedData(this.currentPage.page);
  }

  updateSelected(arg) {
    this.setState({ myPower: arg.text });
  }

  render() {
    return (
      <div className="personalize">
        <ActiveHeading title={this.currentPage.title} />
        <div className="my-power-is">
          <p className="my-power-is__heading">My Power is:</p>
          <p className="my-power-is__detail">{this.state.myPower}</p>
        </div>
        <ContentPage pageInfo={this.props.setup[0]} />
        <Container
          page={this.currentPage.page}
          updateSelected={this.updateSelected.bind(this)}
        />
      </div>
    );
  }
}

Personalize.propTypes = propTypes;

const ActiveHeading = function(props) {
  return (
    <div className="five-steps__active-heading">
      <h1 className="five-steps__heading" style={{ fontSize: '28px' }}>{props.title}</h1>
    </div>
  );
};

export default Personalize;
