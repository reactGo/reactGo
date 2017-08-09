const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute(routes) {
  let params = {};
  let fetchData;
  routes.forEach((route) => {
    params = {
      ...params,
      ...route.match.params,
    };
    fetchData = route.route.fetchData;
  });
  return fetchData ? fetchData(params) : Promise.resolve();
}

export default fetchDataForRoute;

