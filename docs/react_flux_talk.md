autoscale: true

React
=====

![inline](http://www.programwitherik.com/content/images/2015/12/reactjs.png)

## Callbacks, Flux and Redux

---

# About Me


---

# React Intro

- React is a view library

---

##### A Component

```javascript
var Comment = React.createClass({
  render: function() {
    return (
      <p>
        <span>Comment: </span>
        <span>{this.props.body}</span>
      </p>
    )
  }
});

var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <h1>Comments</h1>
        <Comment body="try React!" />
      </div>
    )
  }
});

```

[jsfiddle demo](https://jsfiddle.net/drob/d0afrzpy/)

---

# React Myths

- MYTH: React requires ES6
- TRUTH: ES5 will work fine
- MYTH: I have to learn Flux
- TRUTH: There's no need to start with Flux and many other patterns can be used instead

---

##But what about the data?

This talk will cover 3 different patterns to handle data in React

---

# Callbacks

- Best way to get started
- Great for Hierarchical applications
- Great if few clientside changes

---

#### Show Calls and Text messages

```javascript
<Application >
	<CallList>
		<Call id=1 />
		<Call id=2 />
		<Call id=3 />
	</CallList>
	<TextMessageList>
		<TextMessage id=1 />
		<TextMessage id=2 />
	</TextMessage>
</Application>
```

- Top level Application component manages data
- (read only) data is passed down component hierarchy
- See [simple-callback](https://github.com/droberts84/react-flux-redux-talk/tree/simple-callback/src/components) branch

---

#### I want to text someone who called me

```javascript
var Application = React.class({
  ...
  
  newText: function(textInfo) {
    this.setState({
      messages: _.concat(this.state.messages, {
        id: this.state.messages.length + 1,
        from: textInfo.from,
        number: textInfo.number,
        status: "draft"
      })
    });
  }
  
  render: function() {
    return (
       <div>
    	  <CallList calls={this.state.calls} sendText={this.newText} />
    	  <TextMessageList messages={this.state.messages} />
    	</div>
    )
  }
});
```

- This impacts two independent parts of the applicaiton
- Must touch every component between Application and Call to provide a callback
- see [text-from-call Pull Request](https://github.com/droberts84/react-flux-redux-talk/pull/1)

---

#### I want to integrate this into a larger application

```javascript
<Application>
  <Directory>
    <Contact />
    <Contact />
  </Directory>
  <OtherImportantStuff />
  <Communications >
	 <CallList />
	 <TextMessageList />
  </Communications >
</Application>
```

- I didn't even attempt this one..

---

# Flux

![inline](https://media-mediatemple.netdna-ssl.com/wp-content/uploads/2015/06/flux-react2.png)

- Flux is a pattern, NOT an implementation
- Consistent way for data to flow throughout the application

---

#### Overview of Flux

![inline](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)

---

#### Overview of Flux

![inline](https://github.com/facebook/flux/raw/master/docs/img/flux-diagram-white-background.png)

- One way flow
- A single event is asynchronously dispatched
- Data only changed by the Store
- Doesn't have to be for React

---

#### Action (Creators)

```javascript
let actions = {
  addText(textInfo) {
    // example of error checking
    if ( textInfo.from ) {
      this.dispatch(constants.DRAFT_TEXT, textInfo)
    }
  },

  fetchCalls() {
    var result = API.getCalls();
    this.dispatch(constants.FETCH_CALLS, result);
  },

  fetchMessages() {
    var result = API.getMessages();
    this.dispatch(constants.FETCH_MESSAGES, result);
  }
};
```

- dispatch an action to the dispatcher
- multiple or 0 stores can listen
- may or may not have data
- Good spot for business logic and error handling
- Can query stores or interface with API
- See [flux Pull Request](https://github.com/droberts84/react-flux-redux-talk/pull/2)

---

#### Calling an Action Creator from React Component

```javascript
import React, { Component } from 'react';
import { ListGroupItem, Button, Row, Col } from 'react-bootstrap';
import { Icon } from 'components/Icon';

export class Call extends Component {

  textBack = () => {
    this.props.flux.actions.addText(this.props);
  };

  render() {
    return (
      <ListGroupItem header={this.props.from} >
        <span>{this.props.number}</span>
        <Button bsStyle="success" onClick={this.textBack} className="text-caller" >
          <Icon type="envelope"/>
        </Button>
      </ListGroupItem>
    );
  }
}
```

---

#### Stores

```javascript
var MessageStore = Fluxxor.createStore({
  initialize() {
    this.messages = [];

    this.bindActions(
      constants.FETCH_MESSAGES, this.onMessagesFetched,
      constants.DRAFT_TEXT, this.onDraftText
    );
  },

  getMessages() {
    return this.messages
  },

  onMessagesFetched(messages) {
    this.messages = messages;
    this.emit('change');
  },

  onDraftText(textInfo) {
    this.messages.push({
      id: this.messages.length + 1,
      from: textInfo.from,
      number: textInfo.number,
      status: "draft"
    });

    this.emit('change');
  }
});
```

- Is NOT the same as a model, concerned with single applicaiton domain
- Likely to have many
- `emit` is change events notifies views (components)
- Any component anywhere can "listen" for data changes and read directly form it
- See [flux Pull Request](https://github.com/droberts84/react-flux-redux-talk/pull/2)

---

#### Using the Store in a React Component

```javascript

export class TextMessageList extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.flux.store('MessageStore').on('change', this.updateMessages)
  }

  componentWillUnmount() {
    this.props.flux.store('MessageStore').removeListener('change', this.updateMessages);
  }

  updateMessages = () => {
    this.setState({ messages: this.props.flux.store('MessageStore').getMessages() });
  };

  messageNodes = () => {
    return this.state.messages.map( (message) => {
      return <TextMessage key={message.id} {...message} flux={this.props.flux} />
    });
  };

  render() {
    ...
  }
}
```

---

# Redux

- A very popular alternative to Flux, which focuses on developer experience
- Single Store
- No Dispatcher
- Store consists of a reducer (pure function with no side effects)

---

#### The Reducer

```javascript
function messages(state = [], action) {
  switch(action.type) {
  case 'DRAFT_TEXT':
    return  state.concat([{
        id: state.length + 1,
        from: action.from,
        number: action.number,
        status: "draft"
    }]);
  case 'FETCH_MESSAGES':
    return action.messages
  default:
    return state
  }
}
```

- "updates" data
- pure function to calculate next state from current state and an action
- must not mutate state
- see [redux pull request](https://github.com/droberts84/react-flux-redux-talk/pull/3)

---

#### Composing Reducers

```javascript
// sub reducer
function calls(state = [], action) {
  if (action.type === 'FETCH_CALLS') {
    return action.calls
  else {
    return state
  }
}

// main reducer
function communcationsApp(state = {}, action) {
  return {
    messages: messages(state.messages, action),
    calls: calls(state.calls, action)
  }
}

```

- A reducer can be composed of multiple sub reducers
- redux has a helper `combineReducers`
- see [redux pull request](https://github.com/droberts84/react-flux-redux-talk/pull/3)

---

# Store?

- The Store just takes a reducer to calculate state, and stores that value
- It is the only object required, similar to `flux` instance

---

#### React Component getting state from Redux Store

```javascript
export class TextMessageList extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this.updateMessages);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  updateMessages = () => {
    this.setState({ messages: this.props.store.getState().messages });
  };

  render() {
    ...
  }
}

```
see [redux pull request](https://github.com/droberts84/react-flux-redux-talk/pull/3)

---

#### Action Creators

```javascript
export function addText(textInfo) {
  // example of error checking
  if ( textInfo.from ) {
    return Object.assign({}, textInfo, { type: 'DRAFT_TEXT'} )
  } else {
    return {}
  }
}

export function fetchCalls() {
  // not making async for simplicity
  return {
    type: 'FETCH_CALLS',
    calls: API.getCalls()
  }
}

export function fetchMessages() {
  // not making async for simplicity
  return {
    type: 'FETCH_MESSAGES',
    messages: API.getMessages()
  }
}
```

- Action Creators do not dispatch directly
- They are shortcuts to return a properly formatted action object
- see [redux pull request](https://github.com/droberts84/react-flux-redux-talk/pull/3)

---

#### Using the Action Creator in a Component

```javascript
import React, { Component } from 'react';
...
import { addText } from 'myRedux/actions';

export class Call extends Component {

  textBack = () => {
    this.props.store.dispatch(addText(this.props));
  };

  render() {
    return (
      <ListGroupItem header={this.props.from} >
        <span>{this.props.number}</span>
        <Button bsStyle="success" onClick={this.textBack} className="text-caller" >
          <Icon type="envelope"/>
        </Button>
      </ListGroupItem>
    );
  }
}

```
see [redux pull request](https://github.com/droberts84/react-flux-redux-talk/pull/3)

---



#### React Component Types

- Presentational Components
    - All behaviours are passed as props
    - Only knows how to render UI
- Container Components
    - Connect with Stores
    - specify behavior
    - Minimal or no markup

---

# Resources

- **React Ecosystem Overview** (Pete Hunt) <br>[https://github.com/petehunt/react-howto](https://github.com/petehunt/react-howto)
- **React Transform Boilerplate** <br> [https://github.com/gaearon/react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
- **Source Code from Talk** <br> [https://github.com/droberts84/react-flux-redux-talk](https://github.com/droberts84/react-flux-redux-talk)

---

# Flux Resources

- **Official Flux page** <br> [https://facebook.github.io/flux](https://facebook.github.io/flux)
- **Alt** <br> [http://alt.js.org/](http://alt.js.org/)
- **Fluxxor** <br> [http://fluxxor.com/](http://fluxxor.com/)

---

# Redux Resources

- **Egghead.io course** (Dan Abramov) <br> [https://egghead.io/series/getting-started-with-redux](https://egghead.io/series/getting-started-with-redux)
- **Offical Redux Page** <br> [http://redux.js.org/](http://redux.js.org/)





