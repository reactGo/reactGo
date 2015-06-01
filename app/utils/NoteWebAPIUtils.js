var $ = require('jquery');

module.exports = {
  /*
   @param {Promise}
   */
  create: function(data) {
    return $.ajax({
      url: '/note',
      type: 'POST',
      data: data
    });
  },

  getAll: function() {
    return $.ajax({
      url: '/note',
      type: 'GET'
    });
  }

};
