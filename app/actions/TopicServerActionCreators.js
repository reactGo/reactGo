var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

module.exports = {
	/**
	 * @param {Object} json object
	 */
	receiveAllTopics: function(data) {
		AppDispatcher.dispatch({
			actionType: Constants.RECEIVE_RAW_TOPICS,
			data: data
		});
	},

    receiveCreatedTopic: function(createdTopic) {
        AppDispatcher.dispatch({
            actionType: Constants.RECEIVE_RAW_CREATED_TOPIC,
            rawTopic: createdTopic
        });
    },

    failedToCreateTopic: function(failedTopic, reason) {
    	AppDispatcher.dispatch({
    		actionType: Constants.FAILED_TO_CREATE_TOPIC,
    		id: failedTopic.id,
    		reason: reason
    	});
    }
};
