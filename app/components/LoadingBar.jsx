import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class LoadingBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      style: {
        display: 'none',
        position: 'absolute',
        width: '0%',
        height: '3px',
        backgroundColor: 'red',
        transition: 'width 400ms ease-out, height 400ms linear'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status) {
      let progress = 0;
      this.setState({
        style: Object.assign({}, this.state.style, {
          width: '0%'
        })
      });

      let timer = setInterval(() => {
        if (progress <= (100 - nextProps.step)) {
          this.setState({
            style: Object.assign({}, this.state.style, {
              width: `${progress += nextProps.step}%`,
              display: 'block'
            })
          });
        }
      }, nextProps.speed);

      this.setState({
        timer: timer
      });
    } else {
      clearInterval(this.state.timer);

      this.setState({
        timer: null,
        style: Object.assign({}, this.state.style, {
          width: '100%',
          display: 'none'
        })
      });
    }
  }

  render() {
    return (
      <div>
        <div style={this.state.style} className={this.props.className}></div>
        <div style={{ display: 'table', clear: 'both' }}></div>
      </div>
    )
  }
}

LoadingBar.propTypes = {
  className: PropTypes.string,
  speed: PropTypes.number,
  step: PropTypes.number,
  status: PropTypes.bool,
}

function mapStateToProps(state) {
  return {...state.loading};
}

export default connect(mapStateToProps)(LoadingBar)
