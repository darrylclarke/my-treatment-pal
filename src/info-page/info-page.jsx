import each from 'lodash/each';
import React from 'react';
import ProgressBar from '../progress-bar';
import ContentPage from '../content-page';
import ArrowBar from '../arrow-bar';
import './info-page.css';

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localPage: 0
    };

    // testing
    // each(this.props.setup, c => console.log(c));
  }

  get pageName() {
    return this.currentPage.page;
  }

  get currentPage() {
    return this.props.setup[this.state.localPage];
  }

  createPages() {
    return this.props.setup.map((pageInfo, index) => this.createPage(pageInfo, index));
  }

  get numPages() {
    return this.props.setup.length;
  }

  changeSubPage(offset) {
    let page = this.state.localPage;
    if (offset < 0 && page <= 0) {
      return;
    } else if (offset > 0 && page >= this.numPages) {
      return;
    }
    this.setState({ localPage: page + offset });
  }

  createPage(pageInfo, index) {
    let content = <ContentPage pageInfo={pageInfo} />;

    return (
      <div>
        <h1 className="info-page__over-heading">Behind The Law</h1>
        <h2 className="info-page__heading">{pageInfo.title}</h2>
        <ArrowBar
          isFirst={this.isFirstPage}
          isLast={this.isLastPage}
          changePage={this.changeSubPage.bind(this)}
        />
        {content}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="info-page">
          <ProgressBar page={this.pageName} setup={this.props.setup} />
          {this.createPage(this.currentPage, this.state.localPage)}
          <ArrowBar
            isFirst={this.isFirstPage}
            isLast={this.isLastPage}
            changePage={this.changeSubPage.bind(this)}
          />
        </div>
      </div>
    );
  }

  get isFirstPage() {
    return this.state.localPage <= 0;
  }

  get isLastPage() {
    return this.state.localPage >= this.numPages - 1;
  }
}

export default InfoPage;
