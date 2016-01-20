import { createStore } from 'redux';
import communcationsApp from 'myRedux/reducers'

let store = createStore(communcationsApp);

store.subscribe(() =>
  console.log("Current state is : ", store.getState())
);

export default store
