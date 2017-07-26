import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { getData, setData, setSelected } from '../shared/dataSource.js';
import NavbarBottom from '../navbar-bottom';
import InputBox from '../input-box';
import Card from './Card';

const propTypes = {
  page: PropTypes.string.isRequired,
  updateSelected: PropTypes.func
};

function nextId(data) {
  let maxId = 0;
  data.forEach(item => {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });
  return maxId + 1;
}

function findIndex(arr, id) {
  return arr.findIndex((item, index) => item.id === id);
}

// function prependData(state, text) {
//   let id = maxId(state.data);
//   let selected = false;
//   return { data: [{ id, text, selected }, ...state.data] };
// }

class Container extends Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.state = {
      menuOpen: false,
      isTyping: false
    };
  }

  componentWillMount() {
    this.setState({ data: getData(this.props.page) });
  }

  componentWillUnmount() {}

  moveItem(dragIndex, hoverIndex) {
    const { data } = this.state;
    const dragCard = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  }

  closeMenu(option) {
    let item = this.state.item;
    let index = findIndex(this.state.data, item);

    if (option === 'select' && item !== undefined) {
      this.state.data.forEach(current => {
        current.selected = current.id === item;
      });
      if (this.props.updateSelected) {
        let obj = this.state.data[index];
        this.props.updateSelected(obj);
      }
    } else if (option === 'delete' && item) {
      this.setState({
        data: this.state.data.filter((_, i) => i !== index)
      });
    } else if (option === 'move-up' && item) {
      if (index >= 1) {
        this.moveItem(index, index - 1);
      }
    } else if (option === 'move-down' && item) {
      if (index < this.state.data.length - 1) {
        this.moveItem(index, index + 1);
      }
    } else if (option === 'move-top' && item) {
      this.moveItem(index, 0);
    } else if (option === 'move-bottom' && item) {
      this.moveItem(index, this.state.data.length - 1);
    }
    setData(this.props.page, this.state.data, () => {
      this.setState({
        menuOpen: false,
        item: null
      });
    });
  }

  menuButtonClicked(item) {
    // console.log(`menu button clicked ${item}`);
    this.setState({
      menuOpen: true,
      item: item
    });
  }

  addActionClicked(text) {
    // console.log('addaction clicked');
    if (text === '') {
      return;
    }
    let id = nextId(this.state.data);
    let selected = false;
    this.setState({ data: [{ id, text, selected }, ...this.state.data] });
  }

  isTyping(block) {
    if (block.yes) {
      this.setState({ isTyping: true });
    } else {
      this.setState({ isTyping: false });
    }
  }

  render() {
    const { data } = this.state;
    // console.log('Container', this.state.menuOpen);
    return (
      <div className="data-region">
        <InputBox
          style={{ paddingLeft: '5px', paddingRight: '5px' }}
          input={null}
          addActionClicked={this.addActionClicked.bind(this)}
          isTyping={this.isTyping.bind(this)}
        />
        {data.map((item, i) =>
          <Card
            key={item.id}
            index={i}
            id={item.id}
            isSelected={item.selected}
            text={item.text}
            moveItem={this.moveItem}
            isTyping={this.state.isTyping}
            menuButtonClicked={this.menuButtonClicked.bind(this)}
          />
        )}
        <NavbarBottom menuOpen={this.state.menuOpen} closeMenu={this.closeMenu.bind(this)} />
      </div>
    );
  }
}

Container.propTypes = propTypes;

export default DragDropContext(HTML5Backend)(Container);
