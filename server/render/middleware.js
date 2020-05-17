import { createMemoryHistory } from 'history';
import axios from 'axios';
import { matchRoutes } from 'react-router-config';

import routes from '../../app/routes';
import pageRenderer from './pageRenderer';
import { sessionId } from '../../config/secrets';
import createStore from '../../app/store';

const loadBranchData = (url, store) => {
  const branch = matchRoutes(routes, url);
  const promises = branch.map(({ route }) => {
    return route.fetchData ? route.fetchData(store) : Promise.resolve(null);
  });

  return Promise.all(promises);
};

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const store = createStore({
    userStore: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true,
    }
  });
  // For server side rendering.
  if (req.cookies[sessionId]) {
    axios.defaults.headers.common.Cookie = sessionId + '=' + req.cookies[sessionId];
  }
  // If redirection exists, context object is going to have a url property.
  const context = {};
  loadBranchData(req.url, store)
    .then((data) => {
      const html = pageRenderer(req, store, context);
      if (context.url) {
        // If context has a url property, then we need to handle a redirection
        res.writeHead(302, {
          Location: context.url
        });
        res.end();
        return;
      }
      res.status(200).send(html);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}
