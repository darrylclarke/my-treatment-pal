import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ActiveParagraph from '../active-paragraph';

const style = {
  display: 'inline-flex',
  backgroundColor: 'white',
  width: '95%'
};
const outerStyle = {
  padding: '0.5rem 0',
  marginBottom: '.5rem',
  cursor: 'move',
  width: '100%'
};

const buttonStyle = {
  color: 'white',
  backgroundColor: 'blue'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  moveItem: PropTypes.func.isRequired,
  menuButtonClicked: PropTypes.func.isRequired,
  isTyping: PropTypes.bool.isRequired
};

/**
 * Specifies the props to inject into your component.
 */
function collectDS(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

/**
 * Specifies the props to inject into your component.
 */
function collectDT(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Card extends Component {
  render() {
    const { text, isDragging, isSelected, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    const selectedStyle = isSelected
      ? { border: '2px solid blue' }
      : {
          border: '1px dashed gray'
        };

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...outerStyle, display: 'flex', flexDirection: 'row' }}>
          <div style={{ ...style, opacity, ...selectedStyle }}>
            <div style={{ display: 'inline' }}>
              <div style={{}}>
                <ActiveParagraph text={text} />
              </div>
            </div>
          </div>
          <button
            style={{ ...buttonStyle, flex: '1' }}
            onClick={() => {
              if (!this.props.isTyping) {
                this.props.menuButtonClicked(this.props.id);
              }
            }}
          >
            ...
          </button>
        </div>
      )
    );
  }
}

Card.propTypes = propTypes;

// Export the wrapped component:
export default DropTarget(ItemTypes.CARD, cardTarget, collectDT)(
  DragSource(ItemTypes.CARD, cardSource, collectDS)(Card)
);
