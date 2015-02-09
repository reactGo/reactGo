var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var UserWebAPIUtils = require('../utils/UserWebAPIUtils');
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _user = {};

var UserStore = assign({}, EventEmitter.prototype, {

    init: function() {
        _user.email = '';
        _user.password = '';
        // Currently the modal is placed here. Ideally there should be a UI store too.
        _user.modal = false;
    },

    getUserData: function() {
        return _user;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

UserStore.init();


AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case Constants.TOGGLE_MODAL:
            console.log('Converting' + _user.modal);
            _user.modal = !_user.modal;
            UserStore.emitChange();
            break;
        case Constants.SUCCESSFUL_LOGIN:
        case Constants.SUCCESSFUL_SIGNUP:
            _user.email = action.data;
            _user.isLoggedIn = true;
            _user.modal = false;
            UserStore.emitChange();
        default:
    }
});

module.exports = UserStore;
