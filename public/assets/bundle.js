webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	var React = __webpack_require__(1);
	var Application = __webpack_require__(4);
	var TopicWebAPIUtils = __webpack_require__(5);

	// Get all topics from server via Ajax call. This will create an action that will be dispatched to the Store.
	TopicWebAPIUtils.getAllTopics();

	React.render(
		React.createElement(Application, {message: "Welcome to Planet Bumi"}),
		document.getElementById('app')
	);

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/*
	 * This component operates as a "Controller-View". It listens for changes in the
	 * Store and passes the new data to its children.
	 * 
	 * React provides the kind of composable views we need for the view layer. Close to the top of the nested view hierarchy,
	 * a special kind of view listens for events that are broadcast by the stores that it depends on. One could call this a 
	 * controller-view, as it provides the glue code to get the data from the stores and to pass this data down the chain of its
	 * descendants. We might have one of these controller views governing any significant section of the page.
	 *
	 * When it receives an event from the store, it first requires the new data via the store's public getter methods. It then calls
	 * its own setState() or forceUpdate() methods, causing its own render() method and the render() method of all its descendants to run.
	 *
	 * We often pass the entire state of the store down the chain of views in a single object, allowing different descendants to use 
	 * what they need. In addition to keeping the controller-like behavior at the top of the hierarchy, and thus keeping our descendant 
	 */

	var Header = __webpack_require__(9);
	var SideSection = __webpack_require__(10);
	var MainSection = __webpack_require__(11);
	var React = __webpack_require__(1);
	var Store = __webpack_require__(12);

	function getState() {
		return {
			allTopics: Store.getAll(),
			topTopic : Store.getTopTopic()
		};
	}
	 
	var App = React.createClass({displayName: 'App',

		getInitialState: function() {
			return getState();
		},

		componentDidMount: function() {
			Store.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			Store.removeChangeListener(this._onChange);
		},

		/**
		 * @return {object}
		 */
		render: function(){
			return (
				React.createElement("div", null, 
					React.createElement(Header, {topTopic: this.state.topTopic.text, topStat: this.state.topTopic.stat}), 
					React.createElement(SideSection, {allTopics: this.state.allTopics}), 
					React.createElement(MainSection, {allTopics: this.state.allTopics})
				)
			);
		},

		_onChange: function() {
			this.setState(getState());
		}
	});

	module.exports = App;




/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(2);
	var ServerActions = __webpack_require__(7);

	// Placing configuration here, might consider moving it elsewhere
	var defaultConfig = {
		url: '/topic',
		type: 'GET',
		dataType: 'json'
	};

	module.exports = {
		getAllTopics: function() {
			$.ajax(defaultConfig)
				.then(function(data, textStatus, jqXHR) {
					ServerActions.receiveCreatedTopics(data);
				}, function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				});
		},
		addTopic: function(topic) {
			$.ajax({
				url: '/topic',
				data: JSON.stringify(topic),
				type: 'POST',
				contentType: 'application/json'
			})
				.then(function(data, textStatus, jqXHR) {
					console.log(data);
				}, function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				});
		},

		updateTopic: function(topic) {
			$.ajax({
				url: '/topic',
				data: JSON.stringify(topic),
				type: 'PUT',
				contentType: 'application/json'
			})
				.then(function(data, textStatus, jqXHR) {
					console.log(data);
				}, function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				});
		},

		deleteTopic: function(id) {
			$.ajax({
				url: '/topic',
				data: JSON.stringify({id: id}),
				contentType: 'application/json',
				type: 'DELETE'
			})
				.then(function(data, textStatus, jqXHR) {
					console.log(data);
				}, function(jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
				});
		}
	};

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(42);
	var Constants = __webpack_require__(43);

	var ServerActions = {
		/**
		 * @param {Object} json object
		 */
		receiveCreatedTopics: function(data) {
			AppDispatcher.handleServerAction({
				actionType: Constants.RECEIVE_RAW_TOPICS,
				data: data
			});
		}
	};

	module.exports = ServerActions;

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var Actions = __webpack_require__(37);
	var TopicTextInput = __webpack_require__(38);
	var Statistics = __webpack_require__(39);

	var Header = React.createClass({displayName: 'Header',

	  /**
	   * @return {object}
	   */
	  render: function() {
	    return (
	      React.createElement("header", {id: "header"}, 
	        React.createElement("h1", null, "Trending Burger Places"), 
	        React.createElement("h2", null, "Top Burger"), 
	        React.createElement(Statistics, {topTopic: this.props.topTopic, topStat: this.props.topStat}), 
	        React.createElement(TopicTextInput, {
	          id: "new-topic", 
	          placeholder: "Fav burger?", 
	          onSave: this._onSave}
	        )
	      )
	    );
	  },

	  /**
	   * Event handler called within TopicTextInput.
	   * Defining this here allows TopicTextInput to be used in multiple places
	   * in different ways.
	   * @param {string} text
	   */
	  _onSave: function(text) {
	    if (text.trim()){
	      Actions.create(text);
	    }

	  }

	});

	module.exports = Header;

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ReactPropTypes = React.PropTypes;
	var Actions = __webpack_require__(37);
	var TopicCountItem = __webpack_require__(40);
	var _ = __webpack_require__(3);

	var SideSection = React.createClass({displayName: 'SideSection',

	  propTypes: {
	    allTopics: ReactPropTypes.object.isRequired
	  },

	  /**
	   * @return {object}
	   */
	  render: function() {
	    var allTopics = this.props.allTopics;
	    var topicListItems = [];
	    _.forEach(allTopics, function(topic){
	      topicListItems.push(React.createElement(TopicCountItem, {key: topic.id, title: topic.text, count: topic.count}));
	    });

	  	return (
	      React.createElement("div", {id: "side-section"}, 
	        React.createElement("h3", null, "Tally"), 
	        React.createElement("ul", null, 
	          topicListItems
	        )
	      )
	    );
	  },

	  /**
	   * Event handler to delete all completed TODOs
	   */
	  _onClearCompletedClick: function() {
	    Actions.destroyCompleted();
	  }

	});

	module.exports = SideSection;

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ReactPropTypes = React.PropTypes;
	var Actions = __webpack_require__(37);
	var TopicItem = __webpack_require__(41);
	var _ = __webpack_require__(3);

	var MainSection = React.createClass({displayName: 'MainSection',

	  propTypes: {
	    allTopics: ReactPropTypes.object.isRequired
	  },

	  /**
	   * @return {object}
	   */
	  render: function() {
	    // This section should be hidden by default
	    // and shown when there are todos.
	    if (Object.keys(this.props.allTopics).length < 1) {
	      return null;
	    }

	    var allTopics = this.props.allTopics;
	    var topics = [];

	    _.forEach(allTopics, function(value, key){
	      topics.push(React.createElement(TopicItem, {id: key, key: key, topic: value}));
	    });

	    return (
	      React.createElement("section", {id: "main-section"}, 
	        React.createElement("h3", null, "Vote"), 
	        React.createElement("ul", {id: "topic-list"}, topics)
	      )
	    );
	  }

	});

	module.exports = MainSection;

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(42);
	var EventEmitter = __webpack_require__(103).EventEmitter;
	var Constants = __webpack_require__(43);
	var TopicWebAPIUtils = __webpack_require__(5);
	var assign = __webpack_require__(104);
	var _ = __webpack_require__(3);

	var CHANGE_EVENT = 'change';

	var _topics = {}; // Collection of todo items

	/**
	 * Create a TOPIC item.
	 * @param {string} text The context of the TODO
	 */
	function create(text) {
	 	// Using the current timestamp in place of a real id.
	 	var id = Date.now().toString();
	 	_topics[id] = {
	 		id: id,
	    count: 1,
	 		text: text
	 	};
	  TopicWebAPIUtils.addTopic(_topics[id]);
	}

	/**
	 * Update the count of Topic
	 */
	function updateCount(id, update) {
	  _topics[id].count = _topics[id].count + update;
	  TopicWebAPIUtils.updateTopic(_topics[id]);
	}

	/**
	 * Update a TOPIC item.
	 * @param  {string} id
	 * @param {object} updates An object literal containing only the data to be
	 *     updated.
	 */
	function update(id, updates) {
	  _topics[id] = assign({}, _topics[id], updates);
	}

	/**
	 * Update all of the TODO items with the same object.
	 *     the data to be updated.  Used to mark all TODOs as completed.
	 * @param  {object} updates An object literal containing only the data to be
	 *     updated.
	 */
	function updateAll(updates) {
	  // This is inefficient
	  for (var id in _topics) {
	    update(id, updates);
	  }
	}

	/**
	 * Delete a TODO item.
	 * @param  {string} id
	 */
	function destroy(id) {
	  delete _topics[id];
	  TopicWebAPIUtils.deleteTopic(id);
	}

	/**
	 * Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but 
	 * they manage the state of many objects. Nor are they the same as Backbone's collections. More than simply managing a
	 * collection of ORM-style objects, stores manage the application state for a particular domain within the application.
	 *
	 * A store registers itself with the dispatcher and provides it with a callback. This callback receives a data payload 
	 * as a parameter. The payload contains an action with an attribute identifying the action's type. Within the store's
	 * registered callback, a switch statement based on the action's type is used to interpret the payload and to provide the
	 * proper hooks into the store's internal methods. This allows an action to result in an update to the state of the store,
	 * via the dispatcher. After all the stores are updated, they broadcast an event declaring that their state has changed, 
	 * so the views may query the new state and update themselves.
	 */
	var Store = assign({}, EventEmitter.prototype, {

	  /**
	   * Initialize store with topics queried from server.
	   * @param {Object} topics
	   */
	  init: function(rawTopics) {
	    _topics = _.chain(rawTopics)
	                .map(function(topic){
	                  topic.id = topic.id;
	                  return [topic.id, topic];
	                })
	                .object()
	                .value();
	  },

		/**
		 * Get the entire collection of Topics.
		 * @return {object}
		 *
		 */
		getAll: function() {
	    return _topics;
		},

	  getTopTopic: function() {
	    var sum, topTopic, stat;

	    sum = _.reduce(_topics, function(sum, topic) {
	                return sum + topic.count;
	              }, 0);

	    topTopic = _.max(_topics, function(topic) {
	      return topic.count;
	    });

	    // Make sure this is accepted in Node
	    stat = isNaN(topTopic.count /sum) ? 0 : topTopic.count/ sum * 100;

	    return assign({}, topTopic, {'stat': stat});
	  },

		emitChange: function() {
		 	this.emit(CHANGE_EVENT);
		 },

		/**
		 * @param {function} callback
		 */
		addChangeListener: function(callback) {
		  	this.on(CHANGE_EVENT, callback);
		},

		/**
		 * @param {function} callback
		 */
		 removeChangeListener: function(callback) {
		 	this.removeListener(CHANGE_EVENT, callback);
		 }

	});


	// Register to handle all updates
	AppDispatcher.register(function(payload) {
	  var action = payload.action;
	  var text;

	  switch(action.actionType) {
	    case Constants.TOPIC_CREATE:
	      text = action.text.trim();
	      if (text !== '') {
	        create(text);
	      }
	      break;

	    case Constants.TOPIC_INCREMENT:
	      updateCount(action.id, 1);
	      break;

	    case Constants.TOPIC_DECREMENT:
	      updateCount(action.id, -1);
	      break;

	    case Constants.TOPIC_DESTROY:
	      destroy(action.id);
	      break;

	    case Constants.RECEIVE_RAW_TOPICS:
	      Store.init(action.data);
	      break;

	    default:
	      return true;
	  }

	  // This often goes in each case that should trigger a UI change. This store
	  // needs to trigger a UI change after every view action, so we can make the
	  // code less repetitive by putting it here.  We need the default case,
	  // however, to make sure this only gets called after one of the cases above.
	  Store.emitChange();

	  return true; // No errors.  Needed by promise in Dispatcher.
	});

	module.exports = Store;

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	var AppDispatcher = __webpack_require__(42);
	var Constants = __webpack_require__(43);

	var Actions = {

	  /**
	   * @param  {string} text
	   */
	  create: function(text) {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TOPIC_CREATE,
	      text: text
	    });
	  },

	  increment: function(id, text) {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TOPIC_INCREMENT,
	      id: id
	    });
	  },

	  decrement: function(id, text) {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TOPIC_DECREMENT,
	      id: id
	    });
	  },

	  /**
	   * @param  {string} id The ID of the ToDo item
	   * @param  {string} text
	   */
	  updateText: function(id, text) {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TODO_UPDATE_TEXT,
	      id: id,
	      text: text
	    });
	  },

	  /**
	   * Toggle whether a single ToDo is complete
	   * @param  {object} todo
	   */
	  toggleComplete: function(todo) {
	    var id = todo.id;
	    if (todo.complete) {
	      AppDispatcher.handleViewAction({
	        actionType: Constants.TODO_UNDO_COMPLETE,
	        id: id
	      });
	    } else {
	      AppDispatcher.handleViewAction({
	        actionType: Constants.TODO_COMPLETE,
	        id: id
	      });
	    }
	  },

	  /**
	   * Mark all ToDos as complete
	   */
	  toggleCompleteAll: function() {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TODO_TOGGLE_COMPLETE_ALL
	    });
	  },

	  /**
	   * @param  {string} id
	   */
	  destroy: function(id) {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TOPIC_DESTROY,
	      id: id
	    });
	  },

	  /**
	   * Delete all the completed ToDos
	   */
	  destroyCompleted: function() {
	    AppDispatcher.handleViewAction({
	      actionType: Constants.TODO_DESTROY_COMPLETED
	    });
	  }

	};

	module.exports = Actions;

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ReactPropTypes = React.PropTypes;

	var ENTER_KEY_CODE = 13;

	// Code modified from https://github.com/facebook/flux/blob/master/examples/flux-todomvc/js/components/TopicTextInput.react.js
	var TopicTextInput = React.createClass({displayName: 'TopicTextInput',

	  propTypes: {
	    className: ReactPropTypes.string,
	    id: ReactPropTypes.string,
	    placeholder: ReactPropTypes.string,
	    onSave: ReactPropTypes.func.isRequired,
	    value: ReactPropTypes.string
	  },

	  getInitialState: function() {
	    return {
	      value: this.props.value || ''
	    };
	  },

	  /**
	   * @return {object}
	   */
	  render: function() /*object*/ {
	    return (
	      React.createElement("input", {
	        className: this.props.className, 
	        id: this.props.id, 
	        placeholder: this.props.placeholder, 
	        onBlur: this._save, 
	        onChange: this._onChange, 
	        onKeyDown: this._onKeyDown, 
	        value: this.state.value, 
	        autoFocus: true}
	      )
	    );
	  },

	  /**
	   * Invokes the callback passed in as onSave, allowing this component to be
	   * used in different ways.
	   */
	  _save: function() {
	    this.props.onSave(this.state.value);
	    this.setState({
	      value: ''
	    });
	  },

	  /**
	   * @param {object} event
	   */
	  _onChange: function(/*object*/ event) {
	    this.setState({
	      value: event.target.value
	    });
	  },

	  /**
	   * @param  {object} event
	   */
	  _onKeyDown: function(event) {
	    if (event.keyCode === ENTER_KEY_CODE) {
	      this._save();
	    }
	  }

	});

	module.exports = TopicTextInput;

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var Statistics = React.createClass({displayName: 'Statistics',
		render: function(){
			return (
				React.createElement("div", {id: "stat-section"}, 
					React.createElement("span", {className: "topic"}, this.props.topTopic), 
					React.createElement("span", {className: "stat"}, this.props.topStat + '%')
				)
			);
		}
	});

	module.exports = Statistics;

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);

	var TopicCountItem = React.createClass({displayName: 'TopicCountItem',
		render: function(){
			return (
				React.createElement("li", {key: this.props.key}, 
					React.createElement("span", {className: "title"}, this.props.title), 
					React.createElement("span", {className: "count"}, this.props.count)
				)
			);
		}
	});

	module.exports = TopicCountItem;

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ReactPropTypes = React.PropTypes;
	var Actions = __webpack_require__(37);
	var TopicTextInput = __webpack_require__(38);

	var cx = __webpack_require__(105);

	var TopicItem = React.createClass({displayName: 'TopicItem',

	  propTypes: {
	   topic: ReactPropTypes.object.isRequired
	  },

	  getInitialState: function() {
	    return {
	      isEditing: false
	    };
	  },

	  /**
	   * @return {object}
	   */
	  render: function() {
	    var topic = this.props.topic;
	    var input;
	    if (this.state.isEditing) {
	      input =
	        React.createElement(TopicTextInput, {
	          className: "edit", 
	          onSave: this._onSave, 
	          value: topic.text}
	        );
	    }

	    // List items should get the class 'editing' when editing
	    // and 'completed' when marked as completed.
	    // Note that 'completed' is a classification while 'complete' is a state.
	    // This differentiation between classification and state becomes important
	    // in the naming of view actions toggleComplete() vs. destroyCompleted().
	    return (
	      React.createElement("li", {
	        className: cx({
	          'editing': this.state.isEditing
	        }), 
	        key: topic.id}, 
	        React.createElement("div", {className: "view"}, 
	          React.createElement("label", {onDoubleClick: this._onDoubleClick}, 
	            topic.text
	          ), 
	          React.createElement("button", {className: "increment", onClick: this._onIncrement}, "+"), 
	          React.createElement("button", {className: "decrement", onClick: this._onDecrement}, "-"), 
	          React.createElement("button", {className: "destroy", onClick: this._onDestroyClick}, String.fromCharCode(215))
	        ), 
	        input
	      )
	    );
	  },

	  _onToggleComplete: function() {
	    Actions.toggleComplete(this.props.topic);
	  },

	  _onDoubleClick: function() {
	    this.setState({isEditing: true});
	  },

	  _onIncrement: function() {
	    Actions.increment(this.props.topic.id);
	  },

	  _onDecrement: function() {
	    Actions.decrement(this.props.topic.id);
	  },

	  /**
	   * Event handler called within TopicTextInput.
	   * Defining this here allows TopicTextInput to be used in multiple places
	   * in different ways.
	   * @param  {string} text
	   */
	  _onSave: function(text) {
	    Actions.updateText(this.props.topic.id, text);
	    this.setState({isEditing: false});
	  },

	  _onDestroyClick: function() {
	    Actions.destroy(this.props.topic.id);
	  }

	});

	module.exports = TopicItem;

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var Dispatcher = __webpack_require__(151).Dispatcher;
	var assign = __webpack_require__(104);

	var AppDispatcher = assign(new Dispatcher(), {
		/**
		 * A bridge function between the views and the dispatcher, marking the action
		 * as a view action. Another variant here could be handleServerAction.
		 * @param {object} action The data coming from the view. 
		 *
		 */
		 handleViewAction: function(action) {
		 	this.dispatch({
		 		source: 'VIEW_ACTION',
		 		action: action
		 	});
		 },

		 handleServerAction: function(action) {
		 	this.dispatch({
		 		source: 'SERVER_ACTION',
		 		action: action
		 	});
		 }
	});

	module.exports = AppDispatcher;

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var keymirror = __webpack_require__(152);

	module.exports = keymirror({
		TOPIC_CREATE: null,
		TODO_COMPLETE: null,
		TOPIC_INCREMENT: null,
		TOPIC_DECREMENT: null,
		TOPIC_DESTROY: null,
		RECEIVE_RAW_TOPICS: null
	});

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var pendingException;
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				try {
					to[keys[i]] = from[keys[i]];
				} catch (err) {
					if (pendingException === undefined) {
						pendingException = err;
					}
				}
			}
		}

		if (pendingException) {
			throw pendingException;
		}

		return to;
	};


/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}

	module.exports = cx;


/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(164)


/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * @typechecks
	 */

	"use strict";

	var invariant = __webpack_require__(169);

	var _lastID = 1;
	var _prefix = 'ID_';

	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *
	 *         case 'city-update':
	 *           FlightPriceStore.price =
	 *             FlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */

	  function Dispatcher() {
	    this.$Dispatcher_callbacks = {};
	    this.$Dispatcher_isPending = {};
	    this.$Dispatcher_isHandled = {};
	    this.$Dispatcher_isDispatching = false;
	    this.$Dispatcher_pendingPayload = null;
	  }

	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   *
	   * @param {function} callback
	   * @return {string}
	   */
	  Dispatcher.prototype.register=function(callback) {
	    var id = _prefix + _lastID++;
	    this.$Dispatcher_callbacks[id] = callback;
	    return id;
	  };

	  /**
	   * Removes a callback based on its token.
	   *
	   * @param {string} id
	   */
	  Dispatcher.prototype.unregister=function(id) {
	    invariant(
	      this.$Dispatcher_callbacks[id],
	      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
	      id
	    );
	    delete this.$Dispatcher_callbacks[id];
	  };

	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   *
	   * @param {array<string>} ids
	   */
	  Dispatcher.prototype.waitFor=function(ids) {
	    invariant(
	      this.$Dispatcher_isDispatching,
	      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
	    );
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this.$Dispatcher_isPending[id]) {
	        invariant(
	          this.$Dispatcher_isHandled[id],
	          'Dispatcher.waitFor(...): Circular dependency detected while ' +
	          'waiting for `%s`.',
	          id
	        );
	        continue;
	      }
	      invariant(
	        this.$Dispatcher_callbacks[id],
	        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
	        id
	      );
	      this.$Dispatcher_invokeCallback(id);
	    }
	  };

	  /**
	   * Dispatches a payload to all registered callbacks.
	   *
	   * @param {object} payload
	   */
	  Dispatcher.prototype.dispatch=function(payload) {
	    invariant(
	      !this.$Dispatcher_isDispatching,
	      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
	    );
	    this.$Dispatcher_startDispatching(payload);
	    try {
	      for (var id in this.$Dispatcher_callbacks) {
	        if (this.$Dispatcher_isPending[id]) {
	          continue;
	        }
	        this.$Dispatcher_invokeCallback(id);
	      }
	    } finally {
	      this.$Dispatcher_stopDispatching();
	    }
	  };

	  /**
	   * Is this Dispatcher currently dispatching.
	   *
	   * @return {boolean}
	   */
	  Dispatcher.prototype.isDispatching=function() {
	    return this.$Dispatcher_isDispatching;
	  };

	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @param {string} id
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
	    this.$Dispatcher_isPending[id] = true;
	    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
	    this.$Dispatcher_isHandled[id] = true;
	  };

	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @param {object} payload
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
	    for (var id in this.$Dispatcher_callbacks) {
	      this.$Dispatcher_isPending[id] = false;
	      this.$Dispatcher_isHandled[id] = false;
	    }
	    this.$Dispatcher_pendingPayload = payload;
	    this.$Dispatcher_isDispatching = true;
	  };

	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
	    this.$Dispatcher_pendingPayload = null;
	    this.$Dispatcher_isDispatching = false;
	  };


	module.exports = Dispatcher;


/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ }

});