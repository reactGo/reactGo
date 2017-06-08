# Redux with React

There are a million good resources out there for learning Redux.
If you want to learn more, just go to the [docs](http://redux.js.org/).
Trust me, it's good. Otherwise, read the code yourself!

This README is here to explain some of the syntax we opted to use.

We recently switched to using `mapDispatchToProps` in our react-redux `connect`
function. This is an implementation detail, but I hope the explanation below
provides a bit more clarity if you are confused.


**connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])**

Examples out in the wild typically only maps State to props, and expect a
`dispatch` prop to be passed into the component.

```javascript
import { someAction } from 'actions';

class Life extends React.Component {
  constructor(props) {
    super(props);
    this.doSomething = this.doSomething.bind(this);
  }

  doSomething() {
    this.props.dispatch(someAction());
  }

  render() {
    return (<div onClick={this.doSomething}>{this.props.todos}</div>
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps)(Life);
```

It makes sense and gives clarity to what the Container component is doing.
However, we've found that using mapDispatchToProps is a better way forward
because:
- It takes away the `redux` implementation away from this component. It becomes a
  simple component that only expects `func` as props when an action is triggered.

The example below will illustrate what I mean:


```javascript
import { someAction } from 'actions';

class Life extends React.Component {

  render() {
    return (<div onClick={this.props.someAction}>{this.props.todos}</div>
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps, { someAction })(Life);
```

Read more
[here](https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-todos-and-all-action-creators) to understand.

Alternatively, you can write a `mapDispatchToProps` function if you wish to make
your code more readable.

```javascript

import { someAction } from 'actions';

class Life extends React.Component {

  render() {
    return (<div onClick={this.props.someAction}>{this.props.todos}</div>
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    someAction: () => dispatch(someAction)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Life);
```

