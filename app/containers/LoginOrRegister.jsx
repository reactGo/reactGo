import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showMessage } from 'actions/messages';
import { signWithCredentials, toggleLoginMode } from 'actions/users';
import styles from 'css/components/login';
import hourGlassSvg from 'images/hourglass.svg';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { dispatch, user: { isLogin } } = this.props;
    const formData = {
      'email': ReactDOM.findDOMNode(this.refs.email).value,
      'password': ReactDOM.findDOMNode(this.refs.password).value,
    };

    dispatch(signWithCredentials(formData, isLogin))
      .then(() => {
        dispatch(showMessage('success', 'Welcome to Ninja Ocean!'));
        dispatch(push('/'));
      })
      .catch((response) => {
        dispatch(showMessage('error', response.error.data.message));
      });
  }

  toggleMode() {
    this.props.dispatch(toggleLoginMode());
  }

  render() {
    const { isWaiting, isLogin } = this.props.user;

    return (
      <div className={cx('login', {
        waiting: isWaiting
      })}>
        <div className={cx('container')}>
          {
            isLogin ? (
              <div className={cx('header')}>
                <h1 className={cx('heading')}>Login with Email</h1>
                <div className={cx('alternative')}>
                  Not what you want?
                  <a className={cx('alternative-link')}
                    onClick={this.toggleMode}> Register an Account</a>
                </div>
              </div>
            ) : (
              <div className={cx('header')}>
                <h1 className={cx('heading')}>Register with Email</h1>
                <div className={cx('alternative')}>
                  Already have an account?
                  <a className={cx('alternative-link')}
                    onClick={this.toggleMode}> Login</a>
                </div>
              </div>
            )
          }
          <img className={cx('loading')} src={hourGlassSvg} />
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input className={cx('input')}
                type="email"
                ref="email"
                placeholder="email" />
              <input className={cx('input')}
                type="password"
                ref="password"
                placeholder="password" />
              <div className={cx('hint')}>
                <div>Hint</div>
                <div>email: example@ninja.com password: ninja</div>
              </div>
              <input className={cx('button')}
                type="submit" value={isLogin ? 'Login' : 'Register'} />
            </form>
          </div>
          <div className={cx('google-container')}>
            <h1 className={cx('heading')}>Google Login Demo</h1>
            <a className={cx('button')} href="/auth/google">Login with Google</a>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(LoginOrRegister);
