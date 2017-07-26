import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
// import { Grid, Col } from 'react-bootstrap';
import NavbarRight from './navbar';

// const yaml = require('js-yaml');
// var testJson = require('json-loader!yaml-loader!./shared/test.yml');

// DCNavbarPrep(window);

// const SlideRight = new Menu({
//   wrapper: '#o-wrapper',
//   type: 'slide-right',
//   menuOpenerClass: '.c-button',
//   maskId: '#c-mask'
// });

// const SlideRightBtn = document.querySelector('#c-button--slide-right');

// SlideRightBtn.addEventListener('click', e => {
//   e.preventDefault;
//   SlideRight.open();
// });

export default class App extends Component {
  componentDidMount() {
    var untrusted_code = `
ring: 
  - function ery_evil_thing
  - blue
chips: 
  - yellow
  - green
`;
    // var a = yaml.load(untrusted_code);
    // console.log(JSON.stringify(a));
    // console.log(JSON.stringify(testJson.CATEGORY[0].label));
  }

  render2() {
    return (
      <div className="main-app-container">
        <NavbarRight />
        <div id="o-wrapper" className="page">
          <h2>Hello Neutrino + React!</h2>
        </div>
      </div>
    );
  }
  render2() {
    /*return (
      <Router>
        {/*<Grid>
          <Col sm={2}>
          </Col>
          <Col sm={10}>

        <div className="main-app-container">
          <NavbarRight />
          <div id="o-wrapper" className="page">
            <h2>Hello Neutrino + React!</h2>
          </div>

          <Switch>
            <Route path="/" exact component={Counter} />
            <Route path="/about" render={() => <h3>About Us</h3>} />
            <Route render={() => <h3>No route found!</h3>} />
          </Switch>
        </div>
        </Col>
        </Grid>
      </Router>
    );*/
  }
}

/*const Nav = () => (
  <nav style={navStyles}>
    <ul style={navStyles.list}>
      <li>
        <NavLink to="/" exact activeStyle={navStyles.activeLinks}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/about" activeStyle={navStyles.activeLinks}>About</NavLink>
      </li>
    </ul>
  </nav>
);*/

const navStyles = {
  marginTop: '60px',
  list: {
    listStyleType: 'none',
    textTransform: 'uppercase',
    lineHeight: '2',
    paddingLeft: '10px'
  },
  activeLinks: {
    fontWeight: 900
  }
};
