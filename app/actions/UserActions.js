import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class UserActions {

  manuallogin(data) {
    this.dispatch();

    let { email, password, router } = data;

    UserWebAPIUtils.manuallogin({email: email, password: password})
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.loginsuccess(router);
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  loginsuccess(router) {
    this.dispatch(router);
  }

  // Leaving this here for future use
  register(data) {
    this.dispatch(data);
  }

  logout() {
    this.dispatch();
    UserWebAPIUtils.logout()
      .then((response, textStatus) => {
        if (textStatus === 'success') {
          // Dispatch another event for successful login
          this.actions.logoutsuccess();
        }
      }, () => {
        // Dispatch another event for a bad login
      });
  }

  logoutsuccess() {
    this.dispatch();
  }
}

export default alt.createActions(UserActions);
