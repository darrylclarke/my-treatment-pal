import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { getData, setData } from '../shared/dataSource.js';
import Card from './Card';

const propTypes = {
  page: PropTypes.string.isRequired
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.state = {};
  }

  componentWillMount() {
    console.log('willmount');
    this.setState({ data: getData(this.props.page) });
  }

  componentWillUnmount() {
    setData(this.props.page, this.state.data);
  }

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

  render() {
    const { data } = this.state;

    return (
      <div className="data-region">
        {data.map((item, i) =>
          <Card
            key={item.id}
            index={i}
            id={item.id}
            text={item.text}
            moveItem={this.moveItem}
          />
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
