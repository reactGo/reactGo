var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

module.exports = {
	toggleModal: function() {
		AppDispatcher.dispatch({
			actionType: Constants.TOGGLE_MODAL
		});
	}
};