var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ServerActions = {
	/**
	 * @param {Object} json object
	 */
	receiveCreatedTopics: function(data) {
		AppDispatcher.dispatch({
			actionType: Constants.RECEIVE_RAW_TOPICS,
			data: data
		});
	}
};

module.exports = ServerActions;
