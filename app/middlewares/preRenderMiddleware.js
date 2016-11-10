const defaultFetchData = () => Promise.resolve();

function preRenderMiddleware({ props: { routes, location, params }, api }) {
  const matchedRoute = routes[routes.length - 1];
  const fetchDataHandler = matchedRoute.fetchData || defaultFetchData;
  return fetchDataHandler({ params, api });
}

export default preRenderMiddleware;
