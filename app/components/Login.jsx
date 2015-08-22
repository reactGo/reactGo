import React from 'react';
import Immutable from 'immutable';

import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

import styles from 'scss/components/_login';

export default class Login extends React.Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }

  _onLoginSubmit = () => {
    const email = React.findDOMNode(this.refs.email).value;
    const password = React.findDOMNode(this.refs.password).value;
    UserActions.manuallogin({
      email: email,
      password: password
    });
  }

  render() {
    let renderedResult;
    if (this.state.user.get('authenticated')) {
      renderedResult = (<h1 className={styles.login__header}>You are logged in amigo</h1>);
    } else {
      if (this.state.user.get('isWaiting')) {
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
}

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
