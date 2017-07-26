import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './input-box.css';

const propTypes = {
  input: PropTypes.string,
  addActionClicked: PropTypes.func.isRequired,
  isTyping: PropTypes.func.isRequired
};

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: props.input || ''
    };
  }

  handleChange(event) {
    this.props.isTyping({ yes: true });
    // console.log('typing yes');
    this.setState({ input: event.target.value });
  }

  add() {
    // console.log('typing no');
    this.props.isTyping({ yes: false });

    let input = this.state.input;
    this.setState({ input: '' });
    this.props.addActionClicked(input);
    let inputBox = this.refs.inputBox;
    inputBox.value = '';
  }

  render() {
    let buttonStyle = {
      width: '10%',
      height: '40px',
      backgroundColor: 'green',
      color: 'white',
      verticalAlign: 'top'
    };

    return (
      <div style={{ marginBottom: '10px' }}>
        <textarea
          ref="inputBox"
          style={{ boxSizing: 'border-box', width: '90%' }}
          onChange={this.handleChange.bind(this)}
          placeholder={"Enter text here and press the '+' button..."}
        />
        <button style={buttonStyle} onClick={this.add.bind(this)}>
          +
        </button>
      </div>
    );
  }
}

InputBox.propTypes = propTypes;

export default InputBox;
