import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showMessage } from 'actions/messages';
import { signWith } from 'actions/users';
import styles from 'css/components/login';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { signWith, showMessage, push, route: { isLogin } } = this.props;
    const credentials = {
      'email': ReactDOM.findDOMNode(this.refs.email).value,
      'password': ReactDOM.findDOMNode(this.refs.password).value,
    };

    signWith(credentials, isLogin)
      .then(() => {
        showMessage('success', 'Welcome to Ninja Ocean!');
        push('/');
      })
      .catch((response) => {
        showMessage('error', response.error.data.message);
      });
  }

  render() {
    const { route: { isLogin } } = this.props;

    return (
      <div className={cx('login')}>
        <div className={cx('container')}>
          {
            isLogin ? (
              <div className={cx('header')}>
                <h1 className={cx('heading')}>Login with Email</h1>
                <div className={cx('alternative')}>
                  Not what you want?
                  <Link to="/register" className={cx('alternative-link')}> Register an Account</Link>
                </div>
              </div>
            ) : (
              <div className={cx('header')}>
                <h1 className={cx('heading')}>Register with Email</h1>
                <div className={cx('alternative')}>
                  Already have an account?
                  <Link to="/login" className={cx('alternative-link')}> Login</Link>
                </div>
              </div>
            )
          }
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
  signWith: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {};
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { signWith, showMessage, push })(LoginOrRegister);
