import $ from 'jquery';

const utils = {
  /*
   * @param {Object} payload to be sent to server
   * @return {Promise}
   */
  manuallogin: (data) => {
    const CSRF_HEADER = 'X-CSRF-Token';
    $.ajaxPrefilter((options, _, xhr) => {
      if (!xhr.crossDomain) {
        xhr.setRequestHeader(CSRF_HEADER, data.csrf);
      }
    });

    return $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
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
      contentType: 'application/json',
      data: JSON.stringify(data)
    });
  }

};

export default utils;
