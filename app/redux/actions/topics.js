import * as types from '../constants/actionTypes';
import TopicWebAPIUtils from 'utils/TopicWebAPIUtils';


export function typing(text) {
	return {
		type: types.TYPING,
		newTopic: text
	};
}

function create(data) {
	return {
		type: types.CREATE_TOPIC,
		id: data.id,
		count: data.count,
		text: data.text
		};
}

function increment(index) {
	return { type: types.INCREMENT_COUNT, index: index };
}

function decrement(index) {
	return { type: types.DECREMENT_COUNT, index: index };
}

function destroy(index) {
	return { type: types.DESTROY_TOPIC, index: index};
}

export function createTopic(text) {
	if (text.trim().length > 0) {
			// Using the current timestamp in place of a real id.
			const id = Date.now().toString();
			const data = {
				id: id,
				count: 1,
				text: text
			};
	return dispatch => {
		dispatch(create(data));
		return TopicWebAPIUtils.addTopic(data)
		.done(() => {
			// Dispatch another event for successful login
		})
		.fail(() => {
				// dispatch an event if fails to notify user that it has failed
		});
	};
	}
}

export function incrementCount(id, index) {
	return dispatch => {
		dispatch(increment(index));
		return TopicWebAPIUtils.updateTopic({ id: id }, false, true);
	};
}

export function decrementCount(id, index) {
	return dispatch => {
		dispatch(decrement(index));
		return TopicWebAPIUtils.updateTopic({ id: id }, false, false);
	};
}

export function destroyTopic(id, index) {
	return dispatch => {
		dispatch(destroy(index));
		return TopicWebAPIUtils.deleteTopic({ id: id });
	};
}

