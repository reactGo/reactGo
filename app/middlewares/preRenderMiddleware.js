import {flatten} from 'lodash'

//Dispatch is from the store
//FetchData is either falsy (null, undefined etc), an action (function, Promise) or an array of either:
export default(dispatch, { routes, params, location: { query } }) => {
  const dataFetchers = flatten(routes.filter(({fetchData}) => !!fetchData).map(e=>e.fetchData))
  return Promise.all(dataFetchers.map(fetchData => dispatch(fetchData({ ...params, query }))))
}
