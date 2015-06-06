# React in ES6 / ES2015

Since React [0.13](http://facebook.github.io/react/blog/2015/03/10/react-v0.13.html) landed on our shores, there's been support for ES6 classes, which is fun!


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

## Questions

1. Why do you use babel-loader instead of jsx-loader with the --harmony flag set in webpack?
This [issue](https://github.com/webpack/react-starter/issues/48) was discussed here. jsx-loader supports a lot less ES6 than babel.
