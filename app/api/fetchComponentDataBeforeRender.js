/**
* This looks at static needs parameter in components and waits for the promise to be fullfilled
* It is used to make sure server side rendered pages wait for APIs to resolve before returning res.end()
*/

export function fetchComponentDataBeforeRender(dispatch, components, params) {
  const needs = components.reduce( (prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
    }, []);
    const promises = needs.map(need => dispatch(need()));
    return Promise.all(promises);
}