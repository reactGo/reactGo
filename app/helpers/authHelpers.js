export function requireAuth(nextState, replace) {
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
}
