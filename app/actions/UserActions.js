var alt = require('../alt');
var UserWebAPIUtils = require('../utils/UserWebAPIUtils');

/*
 * Declaring UserActions using ES2015. This is equivalent to creating
 * function UserActions() {}
 * AND
 * UserActions.prototype.create() = function(data) {}
 */
class UserActions {

  login(data) {
    this.dispatch();
    
    var _this = this;
    UserWebAPIUtils.login(data)
      .then(function(response, textStatus, jqXHR) {
        if(textStatus === 'success') {
          // Dispatch another event for successful login
          _this.actions.loginsuccess(data.email);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        // Dispatch another event for a bad login
      });
  }

  loginsuccess(email) {
    this.dispatch(email);
  } 

  // Leaving this here for future use
  register(data) {
    this.dispatch(data);
  }

  logout() {
    this.dispatch();
    var _this = this;
    UserWebAPIUtils.logout()
      .then(function(response, textStatus, jqXHR) {
        if(textStatus === 'success') {
          // Dispatch another event for successful login
          _this.actions.logoutsuccess();
        }
      }, function(jqXHR, textStatus, errorThrown) {
        // Dispatch another event for a bad login
      });
  }

  logoutsuccess() {
    this.dispatch();
  }
}

module.exports = alt.createActions(UserActions);



//   submitSignUpCredentials: function(data) {
//     AppDispatcher.dispatch({
//       actionType: Constants.SUBMIT_SIGNUP_CREDENTIALS,
//       data: data
//     });
//     UserWebAPIUtils.signUp(data)
//       .then(function(response, textStatus, jqXHR) {
//         if(textStatus === 'success') {
//           // Dispatch an app
//           // Dispatch another event for successful login
//           AppDispatcher.dispatch({
//             actionType: Constants.SUCCESSFUL_SIGNUP,
//             data: data.email
//           });
//         }
//       }, function(jqXHR, textStatus, errorThrown) {

//       });
//   }