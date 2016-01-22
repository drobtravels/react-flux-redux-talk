# Data Handling in React
### Callbacks, Flux and Redux

This repository is a demo application shows 3 different patterns of handling data in React.  Note that the goal of this repository is to show the concepts behind each pattern, so some of the code is overly vague and should NOT be considered best practice.

First, we start with a [simple application](https://github.com/droberts84/react-flux-redux-talk/tree/simple-callback) using read only data.

Then, we add a new requirement to text back callers.  This is not simple because it touches two different domains of the application.  See [text-from-caller pull request](https://github.com/droberts84/react-flux-redux-talk/pull/1).

We then [refactor to Flux](https://github.com/droberts84/react-flux-redux-talk/pull/2) to avoid some of the problems associated with the last pull request.

Finally, we will [refactor to Redux](https://github.com/droberts84/react-flux-redux-talk/pull/3) as an alternative to Flux.

The slides from the talk associated with this code are available on [SlideShare](http://www.slideshare.net/DavidRoberts38/data-handling-in-react-callbacks-flux-and-redux) or in [markdown](https://github.com/droberts84/react-flux-redux-talk/blob/master/docs/react_flux_talk.md)
