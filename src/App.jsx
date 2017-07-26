import React, { Component } from 'react';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import './App.css';
import './shared/colours.css';
import NavbarRight from './navbar-right';
// import ProgressBar from './progress-bar';
import InfoPage from './info-page';
import FiveSteps from './five-steps';
import Personalize from './personalize';
import TreatmentPage from './treatment-page';
import content from './shared/page-layout.json';
import { load } from './shared/dataSource.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home'
    };

    // alert(JSON.stringify(content.behindTheLaw));
  }

  componentWillMount() {
    load();
  }

  componentDidMount() {
    // var a = yaml.load(untrusted_code);
    // console.log(JSON.stringify(a));
    // console.log(JSON.stringify(content.behindTheLaw[2].content.heading));
  }

  setPage(page) {
    this.setState({ page: page });
  }

  fiveStepPage(index) {
    return (
      <FiveSteps
        setup={content.fiveStepsOfTreatment}
        setPage={this.setPage.bind(this)}
        index={index}
      />
    );
  }

  render() {
    return (
      <div className="App main-app-container">
        <NavbarRight page={this.state.page} setPage={this.setPage.bind(this)} />
        <div id="o-wrapper" className="page">
          <div className="app-container">
            {this.state.page === 'home' && <Home />}
            {this.state.page === 'this_app_is_for_you' && <About />}
            {this.state.page === 'behind_the_law' && <InfoPage setup={content.behindTheLaw} />}
            {this.state.page === 'personalize' &&
              <Personalize setup={content.personalizeYourPower} />}
            {this.state.page === 'purpose' && this.fiveStepPage(0)}
            {this.state.page === 'recognition' && this.fiveStepPage(1)}
            {this.state.page === 'unification' && this.fiveStepPage(2)}
            {this.state.page === 'realization' && this.fiveStepPage(3)}
            {this.state.page === 'thanksgiving' && this.fiveStepPage(4)}
            {this.state.page === 'release' && this.fiveStepPage(5)}
            {this.state.page === 'treatment' && <TreatmentPage setup={content.treatment} />}
          </div>
        </div>
      </div>
    );
  }
}

const Home = () => {
  return (
    <div className="outside-title">
      <div className="title">
        <div className="title-words title-words__1"><p>My</p></div>
        <div className="title-words title-words__2"><p>Treatment</p></div>
        <div className="title-words title-words__3"><p>Pal</p></div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div style={{ margin: '30px' }}>
      <p><br /></p>
      <p>
        This app is designed to help you with your Spiritual Mind Treatments. There are some
        learning
        resources to get you started. Then you can pick a name for your Higher Power, and make
        lists
        of your ideas for the purposes of your treatments and the components of your
        treatments.
      </p>
      <p><br /></p>
      <p>
        The last page shows you the resulting treatment for the items you have selected along
        the way.
        You can also avail yourself of the Auto-Treatment if you are feeling lucky!
      </p>
    </div>
  );
};

export default DragDropContext(TouchBackend)(App);
