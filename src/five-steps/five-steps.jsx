import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import ProgressBar from '../progress-bar';
import ContentPage from '../content-page';
import ArrowBar from '../arrow-bar';
import InfoCard from '../info-card';
import Container from '../shared/Container';
// import pages from '../shared/pages.json';
import './five-steps.css';

class FiveSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localPage: 0,
      displayHelp: false
    };
  }

  /* Props
  setup
  setPage
  index
  */

  get pageName() {
    return this.currentPage.page;
  }

  get currentPage() {
    return this.props.setup[this.props.index];
  }

  pageNameAt(pageNumber) {
    return this.props.setup[pageNumber].page;
  }

  changePage(offset) {
    let page = this.props.index;
    if (offset < 0 && page <= 0) {
      return;
    } else if (offset > 0 && page >= this.numPages) {
      return;
    }
    // this.setState({ localPage: page + offset });
    // The following actually changes the page.
    this.props.setPage(this.pageNameAt(page + offset));
  }

  toggleHelp() {
    this.setState({ displayHelp: !this.state.displayHelp });
  }

  renderContent() {
    return (
      <div>
        <ArrowBar
          innerClass={'reduced-margin'}
          isFirst={this.isFirstPage}
          isLast={this.isLastPage}
          changePage={this.changePage.bind(this)}
        />
        {false && this.renderCards()}
        <Container page={this.pageName} />
        <br />
        <br />
        <ArrowBar
          isFirst={this.isFirstPage}
          isLast={this.isLastPage}
          changePage={this.changePage.bind(this)}
        />
      </div>
    );
  }

  renderCards() {
    return [<InfoCard key={0} />, <InfoCard key={10} />, <InfoCard key={20} />];
  }

  renderHelp() {
    let content = <ContentPage pageInfo={this.currentPage} />;
    return (
      <div className="five-steps__help-expanded">
        {content}
      </div>
    );
  }

  render() {
    return (
      <div>
        <ProgressBar page={this.pageName} setup={this.props.setup} />
        <ActiveHeading
          title={this.currentPage.title}
          direction={this.state.displayHelp ? 'up' : 'down'}
          action={this.toggleHelp.bind(this)}
        />
        {this.state.displayHelp && this.renderHelp()}
        {!this.state.displayHelp && this.renderContent()}
      </div>
    );
  }

  get numPages() {
    return this.props.setup.length;
  }

  get isFirstPage() {
    return this.props.index <= 0;
  }

  get isLastPage() {
    return this.props.index >= this.numPages - 1;
  }
}

const TriangleButton = function(props) {
  return (
    <button className="five-steps__chevron" onClick={props.action}>
      {props.direction === 'down' && <Glyphicon glyph="chevron-down" />}
      {props.direction === 'up' && <Glyphicon glyph="chevron-up" />}
    </button>
  );
};

const ActiveHeading = function(props) {
  return (
    <div className="five-steps__active-heading">
      <h1 className="five-steps__heading">{props.title}</h1>
      <TriangleButton direction={props.direction} action={props.action} />
    </div>
  );
};

export default FiveSteps;
