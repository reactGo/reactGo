import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin } from 'actions/users';
import styles from 'scss/components/_login';

const cx = classNames.bind(styles);

class Login extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
  }

  _onLoginSubmit() {
    const { dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }));
  }

  render() {
    const { authenticated, isWaiting } = this.props.user;
    if (authenticated) {
      return (
        <h1 className={cx('login__header')}>You are logged in amigo</h1>
      );
    }

    if (isWaiting) {
      return (
        <h1 className={cx('login__header')}>Waiting ...</h1>
      );
    }

    return (
      <div className={cx('login__container')}>
        <h1 className={cx('login__header')}>Email Login Demo</h1>
        <fieldset className={cx('login__fieldset')}>
            <input className={cx('login__input')}
              type="email"
              ref="email"
              placeholder="email" />
            <input className={cx('login__input')}
              type="password"
              ref="password"
              placeholder="password" />
            <button className={cx('login__button', 'login__button--green')}
              onClick={this._onLoginSubmit}>Login</button>
            <p className={cx('login__hint')}>Hint: email: example@ninja.com password: ninja</p>
        </fieldset>
        <h1 className={cx('login__header')}>Google Login Demo</h1>
        <fieldset className={cx('login__fieldset')}>
          <a className={cx('login__button', 'login__button--green')}
            href="/auth/google">Login with Google</a>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login);

