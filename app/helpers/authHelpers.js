import 'es6-promise';
import fetch from 'isomorphic-fetch';
import { RouterState } from 'react-router';

let host = (process.env.HOST || 'localhost');
let port = (process.env.PORT || '3000');
let protocol = (process.env.NODE_ENV === 'production') ? 'https' : 'http';

let API_ENDPOINT = protocol + '://' + host + ':' + port;

function isAuthenticated() {
  return fetch(API_ENDPOINT + '/user/authenticated', {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export function requireAuth(nextState, replace, callback) {
  isAuthenticated()
    .then(res => res.json())
    .then(res => {
      console.log(res.authenticated);
      if (!res.authenticated) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        });
      }
      callback();
    })
    .catch(err => {
      console.log(err.message);
      callback();
    });
}
