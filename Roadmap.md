## Moving to reactGo

**Why**

This boilerplate has grown tremendously since its early days. 

The goal hasn't diverged from its original purpose - best practices and a wonderful development experience.

We wish for this boilerplate to be **useful** to our users from two aspects:
- building non-trivial applications rapidly
- good examples of how to solve common problems - logging in, server-side authentication, etc.

We've found **concrete examples** to be extremely valuable for our users. However, we are aware that this **decreases the efficiency of building a new project** rapidly.

This issue has been raised in [#137](https://github.com/choonkending/react-webpack-node/issues/137), [#156](https://github.com/choonkending/react-webpack-node/issues/156) and [#372](https://github.com/choonkending/react-webpack-node/issues/372)

**Solution**

Our vision for [**reactGo**](https://github.com/reactGo/reactGo) is to be a minimal stateless boilerplate that you will be able to clone and start on work immediately.

It will have the **_minimal_** set of features we think are vital to be **useful**:
- universal Rendering React
- Asynchronous data fetching support
- Redux
- React-router + react-router-redux
- CSS modules + Css next
- Tests with Enzyme
- Deployment files
- Offline support
- Performance
- Express server configuration

Note: DB configuration will not supported in the minimal boilerplate, but we will be creating separate repositories within the reactGo organisation for more specific use-cases.

By reducing our minimal support, we can focus on improving the existing things we know and love.

## What's going to happen?

1. Migration to [**reactGo**](https://github.com/reactGo/reactGo)
Existing react-webpack-node will be moved to that repository.

2. [**release stateless 2.0**](https://github.com/choonkending/react-webpack-node/pull/406) becomes master

3. Other examples will be created as separate repositories (all based on master branch):

- [ ] Server-side react-router authentication
- [ ] MongoDB
- [ ] Postgresql
- [ ] Vote App example

