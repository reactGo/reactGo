import { createMemoryHistory } from 'history';
import axios from 'axios';
import { matchRoutes } from 'react-router-config';
import { END } from 'redux-saga';

import routes from '../../app/routes';
import configureStore from '../../app/store/configureStore';
import pageRenderer from './pageRenderer';
import { sessionId } from '../../config/secrets';

const loadBranchData = async (url, store) => {
  const branch = matchRoutes(routes, url);
  const promises = branch.map(({ route }) => {
    return route.fetchData ? route.fetchData(store) : Promise.resolve(null);
  });
  await Promise.all(promises);
  store.dispatch(END);
  return store.sagaTask.toPromise();
};

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true,
    },
  }, history);
  // For server side rendering.
  if (req.cookies[sessionId]) {
    axios.defaults.headers.common.Cookie = sessionId + '=' + req.cookies[sessionId];
  }
  // If redirection exists, context object is going to have a url property.
  const context = {};
  loadBranchData(req.url, store)
    .then(async () => {
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
