import { combineReducers } from 'redux';

// sub reducer
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

// sub reducer
function calls(state = [], action) {
  switch(action.type) {
  case 'FETCH_CALLS':
    return action.calls
  default:
    return state
  }
}

// the  main reducer
// it will return a new state based on the state and action
// it does not mutate
// this is a shorcut for
// function communcationsApp(state = {}, action) {
//   return {
//     messages: messages(state.messages, action),
//     calls: calls(state.calls, action)
//   }
// }
const communcationsApp = combineReducers({
  messages,
  calls
});

export default communcationsApp;
