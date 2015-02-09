var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var UserWebAPIUtils = require('../utils/UserWebAPIUtils');

module.exports = {
	toggleModal: function() {
		AppDispatcher.dispatch({
			actionType: Constants.TOGGLE_MODAL
		});
	},

  submitLoginCredentials: function(data) {
    // Leaving this action here, as we might want some UI changes
    AppDispatcher.dispatch({
      actionType: Constants.SUBMIT_LOGIN_CREDENTIALS,
      data: data
    });

    UserWebAPIUtils.login(data)
      .then(function(response, textStatus, jqXHR) {
        if(textStatus === 'success') {
          // Dispatch another event for successful login
          AppDispatcher.dispatch({
            actionType: Constants.SUCCESSFUL_LOGIN,
            data: data.email
          });
        }
      }, function(jqXHR, textStatus, errorThrown) {
        // Dispatch another event for a bad login
      });
  },

  submitSignUpCredentials: function(data) {
    AppDispatcher.dispatch({
      actionType: Constants.SUBMIT_SIGNUP_CREDENTIALS,
      data: data
    });
    UserWebAPIUtils.signUp(data)
      .then(function(response, textStatus, jqXHR) {
        if(textStatus === 'success') {
          // Dispatch an app
           // Dispatch another event for successful login
          AppDispatcher.dispatch({
            actionType: Constants.SUCCESSFUL_SIGNUP,
            data: data.email
          });
        }
      }, function(jqXHR, textStatus, errorThrown) {

      });
  }
};