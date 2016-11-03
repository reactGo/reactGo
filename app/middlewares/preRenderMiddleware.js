import {flatten} from 'lodash'

//Dispatch is from the store
//FetchData is either falsy (null, undefined etc), an action (function, Promise) or an array of either:
export default(dispatch, { routes, params, location: { query } }) => {
  // get all routes (that has fetchData) as a flat array
  const flatRoutes = flatten(routes.filter(({fetchData}) => !!fetchData)

  // get each routes fetchData
  const dataFetchers= flatRoutes.map(fr => fr.fetchData)

  // flatten dataFetchers in case of arrays (<Route fetchData={[a, b, c]})/>)
  const flatDataFetchers= flatten(dataFetchers)

  return Promise.all(flatDataFetchers.map(dataFetcher => dispatch(dataFetcher({ ...params, query }))))
}
