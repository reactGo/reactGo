# React in ES6 / ES2015

## React Component in ES5:
```
var App = React.createClass({
  render: function() {
    return (
      <div>
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
```

## React Component in ES6 / ES2015:
```
export class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
}
```

## Autobinding in ES6?
This [article](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding) specifies that with React 0.13 React Components using ES6 classes no longer autobind `this` to your non React methods.

So a React Component in ES5 such as this:

```
var Login = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.getState().user
    };
  },

  componentDidMount: function() {
    UserStore.listen(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.unlisten(this._onChange);
  },

  _onChange: function() {
    this.setState({
      user: UserStore.getState().user
    });
  }

  render: function() {
    ...
  }

});

```

Can be written in ES6 as follows:

```
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  // A neat trick!
  // arrows share the same lexical this as their surrounding code.
  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }

  render() {
    ...
  }
}
```

Alternatively, you could write it as such:
```
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserStore.getState();
    // Explicitly prebinding the method in the constructor
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

  _onChange(){
    this.setState({
      user: UserStore.getState().user
    });
  }

  render() {
    ...
  }
}
```


## Stateless Functions

There is also an exciting way to write React Components as stateless functions (provided...you don't handle state). Read more [here](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions).

Instead of writing a loooong component in React that only renders props, as follows:

```javascript

class WATTT extends React.Component {
  render() {
    const {props1, props2, props3} = this.props;
    return (
      <div>{props1} {prop2} {prop3}</div>
    );
  }
}

```

Choose instead to write it as such:

```javascript
const WATTT = ({props1, props2, props3}) => <div>{props1} {prop2} {prop3}</div>

```

Much simpler, yeah?

## Questions

1. Why do you use babel-loader instead of jsx-loader with the --harmony flag set in webpack?
This [issue](https://github.com/webpack/react-starter/issues/48) was discussed here. jsx-loader supports a lot less ES6 than babel.
