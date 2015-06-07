import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  manuallogin: (data) => {
    return $.ajax({
      url: '/login',
      type: 'POST',
      data: data
    });
  },

  /*
   * @return {Promise}
   */
  logout: () => {
    return $.ajax({
      url: '/logout',
      type: 'GET'
    });
  },

  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  signup: (data) => {
    return $.ajax({
      url: '/signup',
      type: 'POST',
      data: data
    });
  }

};

export default utils;
