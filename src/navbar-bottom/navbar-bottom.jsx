import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import Menu from '../shared/menu';
import './navbar-bottom.css';

const propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  closeMenu: PropTypes.func.isRequired
};

class NavbarBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.SlideBottom = new Menu({
      wrapper: '#o-wrapper',
      type: 'slide-bottom',
      menuOpenerClass: '.c-button',
      maskId: '#c-mask'
    });
  }

  closeClicked() {
    this.props.closeMenu();
    this.SlideBottom.close();
  }

  select(command) {
    this.SlideBottom.close();
    this.props.closeMenu(command);
  }

  edit() {
    this.SlideBottom.close();
    alert(
      'Welcome to "My Treatment Pal"  I hope you are enjoying it and manifesting your dreams!  This is a feature of the PRO version.  For the low price of $19.95 you could be quickly and easily correcting all your spelling mustakes.  \n\nCash only.  Limited Time Offer.  \n\nExclusively for "Power of Your Word" attendees!'
    );
  }

  render() {
    if (this.props.menuOpen) {
      this.SlideBottom.open();
    }

    return (
      <div className="dc-menu-bottom">
        <nav id="c-menu--slide-bottom" className="c-menu c-menu--slide-bottom">
          {/*<MenuButton active={this.props.page === ''} action={this.closeClicked.bind(this)}>
            ← Close Menu
          </MenuButton>*/}

          <MenuButton command={'select'} action={this.select.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="saved" />
            </div>
            Select
          </MenuButton>
          <MenuButton command={'edit'} action={this.edit.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="pencil" />
            </div>
            Edit
          </MenuButton>
          <MenuButton command={'move-top'} action={this.select.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="arrow-up" />
              <Glyphicon glyph="arrow-up" />
            </div>
            Move To Top
          </MenuButton>
          <MenuButton command={'move-up'} action={this.select.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="arrow-up" />
            </div>
            Move Up
          </MenuButton>
          <MenuButton command={'move-down'} action={this.select.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="arrow-down" />
            </div>
            Move Down
          </MenuButton>
          <MenuButton command={'move-bottom'} action={this.select.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="arrow-down" />
              <Glyphicon glyph="arrow-down" />
            </div>
            Move To Bottom
          </MenuButton>
          <MenuButton command={'delete'} action={this.select.bind(this)}>
            <div className="menu-button__inline-glyph menu-button__inline-glyph_bottom">
              <Glyphicon glyph="trash" />
            </div>
            Delete
          </MenuButton>
        </nav>

      </div>
    );
  }
}

NavbarBottom.propTypes = propTypes;

const MenuButton = props => {
  let buttonClass = `menu-button ${props.active && 'menu-button_active'}`;
  let boxClass = props.hasBox && `menu-button__box colour-preset-${props.hasBox}`;

  return (
    <button
      onClick={() => {
        props.action(props.command);
      }}
      className={buttonClass}
    >
      <div className="">
        {props.hasBox && <div className={boxClass} />}
        <div className="menu-button__words menu-button__words_inline">
          {props.children}
        </div>
      </div>
    </button>
  );
};

export default NavbarBottom;
