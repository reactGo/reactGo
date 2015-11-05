import React from 'react';
import styles from 'scss/components/_login';
import { manualLogin } from 'redux/actions/users';
import { connect } from 'react-redux';
class Login extends React.Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
  }

  _onLoginSubmit = () => {
    const email = React.findDOMNode(this.refs.email).value;
    const password = React.findDOMNode(this.refs.password).value;
    this.manuallogin({
      email: email,
      password: password
    });
  }

  render() {
    let renderedResult;
    if (this.props.user.authenticated) {
      renderedResult = (<h1 className={styles.login__header}>You are logged in amigo</h1>);
    } else {
      if (this.props.user.get.isWaiting) {
        renderedResult = (<h1 className={styles.login__header}>Waiting ...</h1>);
      } else {
        renderedResult = (
          <div className={styles.login__container}>
            <h1 className={styles.login__header}>Email Login Demo</h1>
            <fieldset className={styles.login__fieldset}>
                <input className={styles.login__input} type="email" ref="email" placeholder="email" />
                <input className={styles.login__input} type="password" ref="password" placeholder="password" />
                <button className={styles.login__button + ' ' + styles['login__button--green']} onClick={this._onLoginSubmit}>Login</button>
                <p className={styles.login__hint}>Hint: email: example@ninja.com password: ninja</p>
            </fieldset>
            <h1 className={styles.login__header}>Google Login Demo</h1>
            <fieldset className={styles.login__fieldset}>
              <a className={styles.login__button + ' ' + styles['login__button--green']} href="/auth/google">Login with Google</a>
            </fieldset>
          </div>
        );
      }
    }
    return (
        <div className={styles.login}>
          {renderedResult}
        </div>
    );
  }

  manuallogin = (data) => {
    this.props.dispatch(manualLogin(data));
  }
}

Login.propTypes = { user: React.PropTypes.object, dispatch: React.PropTypes.func };

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Login);

