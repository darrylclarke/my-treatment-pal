import React, { Component } from 'react';
import ActiveParagraph from '../active-paragraph';
import pages from '../shared/pages.json';
import './content-page.css';

class ContentPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // props
  // - pageInfo

  pageContent(line, index) {
    if (!line) {
      return <ActiveParagraph key={index} text={' '} />;
    }
    if (typeof line === 'string') {
      return <ActiveParagraph key={index} text={line} />;
    }
    if (line.q) {
      return <p className="paragraph quote" key={index}>{line.q}</p>;
    }
    if (line.ul) {
      return (
        <ul key={index} className="list-style">
          {line.ul.map((item, idx2) =>
            <li className="paragraph list-item" key={idx2}>{item}</li>
          )}
        </ul>
      );
    }
    return (
      (line.p && <ActiveParagraph key={index} text={line.p} />) ||
      (line.h2 && <h3 key={index}>{line.h2}</h3>)
    );
  }

  render() {
    let content;
    if (this.props.pageInfo && pages[this.props.pageInfo.page]) {
      content = pages[this.props.pageInfo.page].map((line, index) =>
        this.pageContent(line, index)
      );
    } else {
      content = [];
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default ContentPage;
