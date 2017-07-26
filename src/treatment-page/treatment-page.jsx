import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActiveParagraph from '../active-paragraph';
import { treatmentPanels, getSelectedData, getRandomData } from '../shared/dataSource.js';
import './treatment-page.css';

const propTypes = {
  // setup: PropTypes.array.isRequired
};

class TreatmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.load(),
      auto: false
    };
  }

  load() {
    return treatmentPanels.map(panel => {
      return { panel, text: getSelectedData(panel) };
    });
  }

  refresh() {
    this.setState({ auto: false, data: this.load() });
    this._div.scrollIntoView();
  }

  autoTreatment() {
    this.setState({
      auto: true,
      data: treatmentPanels.map(panel => {
        return { panel, text: getRandomData(panel) };
      })
    });
    this._div.scrollIntoView();
  }

  render() {
    // console.log(JSON.stringify(this.state.data));
    return (
      <div ref={ref => (this._div = ref)} className="treatment-page">
        <p className="treatment-page treatment-page__heading">
          {this.state.auto && 'Auto'} Treatment
        </p>
        <div className="treatment-page__treatment">
          {this.state.data.map((item, index) =>
            <SubPanel key={index} title={item.panel} text={item.text} />
          )}
        </div>
        <Button
          text="Selected Treatment"
          subClass="btn-success"
          action={this.refresh.bind(this)}
        />
        <Button
          text="Auto-Treatment (*)"
          subClass="btn-warning"
          action={this.autoTreatment.bind(this)}
        />
        <p className="paragraph auto-treatment-warning">
          (*) Demonstrations not guaranteed
        </p>
      </div>
    );
  }
}

TreatmentPage.propTypes = propTypes;

const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const SubPanel = function(props) {
  let title = capitalize(props.title);
  return (
    <div className="treatment-subpanel">
      <p className="treatment-subpanel__title">{title}</p>
      <ActiveParagraph text={props.text} />
    </div>
  );
};

const Button = function(props) {
  let text = props.text;
  let subClass = props.subClass ? ` ${props.subClass}` : '';
  return (
    <div className="treatment-button">
      <button className={'btn treatment-button__btn' + subClass} onClick={props.action}>
        {text}
      </button>
    </div>
  );
};

export default TreatmentPage;
