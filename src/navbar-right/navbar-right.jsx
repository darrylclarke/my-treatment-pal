import React from 'react';
import Menu from '../shared/menu';
import { Glyphicon } from 'react-bootstrap';

import './navbar-right.css';
import gaudi_01 from '../images/gaudi_01.png';

class NavbarRight extends React.Component {
  componentDidMount() {
    this.SlideRight = new Menu({
      wrapper: '#o-wrapper',
      type: 'slide-right',
      menuOpenerClass: '.c-button',
      maskId: '#c-mask'
    });

    const SlideRightBtn = document.querySelector('#c-button--slide-right');

    SlideRightBtn.addEventListener('click', e => {
      e.preventDefault();
      this.SlideRight.open();
    });
  }

  closeClicked() {
    this.SlideRight.close();
  }

  select(page) {
    this.SlideRight.close();
    this.props.setPage(page);
  }

  render() {
    return (
      <div className="dc-navbar">
        <div className="dc-navbar-brand pull-left" href="/">
          <a className="dc-navbar-brand__logo" href="/">
            <img className="dc-navbar-logo" alt="" src={gaudi_01} />
          </a>
          <span className="dc-navbar-brand-label">My Treatment Pal</span>
        </div>
        <button
          id="c-button--slide-right"
          className="c-button pull-right dc-navbar__hamburger"
        >
          <Glyphicon glyph="menu-hamburger" />
        </button>

        <nav id="c-menu--slide-right" className="c-menu c-menu--slide-right">
          {/*<MenuButton active={this.props.page === ''} action={this.closeClicked.bind(this)}>
            ← Close Menu
          </MenuButton>*/}

          <MenuButton
            active={this.props.page === 'home'}
            name={'home'}
            hasBox={null}
            action={this.select.bind(this)}
          >
            Home
          </MenuButton>

          <MenuButton
            active={this.props.page === 'this_app_is_for_you'}
            name={'this_app_is_for_you'}
            hasBox={null}
            action={this.select.bind(this)}
          >
            This App Is For You
          </MenuButton>

          <MenuButton
            active={this.props.page === 'behind_the_law'}
            name={'behind_the_law'}
            hasBox={null}
            action={this.select.bind(this)}
          >
            Behind the Law
          </MenuButton>

          <MenuButton
            active={this.props.page === 'personalize'}
            name={'personalize'}
            hasBox={null}
            action={this.select.bind(this)}
          >
            Personalize Your Power
          </MenuButton>

          <MenuButton
            active={this.props.page === 'purpose'}
            name={'purpose'}
            hasBox={1}
            action={this.select.bind(this)}
          >
            Purpose
          </MenuButton>

          <MenuButton
            active={this.props.page === 'recognition'}
            name={'recognition'}
            hasBox={2}
            action={this.select.bind(this)}
          >
            Recognition
          </MenuButton>

          <MenuButton
            active={this.props.page === 'unification'}
            name={'unification'}
            hasBox={3}
            action={this.select.bind(this)}
          >
            Unification
          </MenuButton>

          <MenuButton
            active={this.props.page === 'realization'}
            name={'realization'}
            hasBox={4}
            action={this.select.bind(this)}
          >
            Realization
          </MenuButton>

          <MenuButton
            active={this.props.page === 'thanksgiving'}
            name={'thanksgiving'}
            hasBox={5}
            action={this.select.bind(this)}
          >
            Thanksgiving
          </MenuButton>

          <MenuButton
            active={this.props.page === 'release'}
            name={'release'}
            hasBox={6}
            action={this.select.bind(this)}
          >
            Release
          </MenuButton>

          <MenuButton
            active={this.props.page === 'treatment'}
            name={'treatment'}
            hasBox={null}
            action={this.select.bind(this)}
          >
            Treatment
          </MenuButton>
        </nav>

        <div id="c-mask" className="c-mask" />

      </div>
    );
  }
}

const MenuButton = props => {
  let buttonClass = `menu-button ${props.active && 'menu-button_active'}`;
  let boxClass = props.hasBox && `menu-button__box colour-preset-${props.hasBox}`;

  return (
    <button
      onClick={() => {
        props.action(props.name);
      }}
      className={buttonClass}
    >
      <div className="">
        {props.hasBox && <div className={boxClass} />}
        <div className="menu-button__words">
          {props.children}
        </div>
      </div>
    </button>
  );
};

export default NavbarRight;
