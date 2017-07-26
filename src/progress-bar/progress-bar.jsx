import React from 'react';
import './progress-bar.css';

class ProgressBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const cells = this.props.setup.map(cell => {
      let selectedStyle = this.props.page === cell.page
        ? 'dc-progress-bar__cell_selected'
        : 'opaque dc-progress-bar__cell_border_' + cell.colour;
      return (
        <td
          key={cell.page}
          className={
            'dc-progress-bar__cell colour-preset-' + cell.colour + ' ' + selectedStyle
          }
        />
      );
    });

    return (
      <div className="dc-progress-bar">
        <table>
          <tbody>
            <tr className="dc-progress-bar__row">
              {cells}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProgressBar;
