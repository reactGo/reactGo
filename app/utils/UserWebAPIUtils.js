var $ = require('jquery');

module.exports = {
  /*
    @param {Promise}
   */
  login: function(data) {
    return $.ajax({
      url: '/login',
      type: 'POST',
      data: data
    });
  },

  signUp: function(data) {
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: data
    })
      .then(function(data, textStatus, jqXHR) {
        console.log(data);
      }, function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      })
  }
};