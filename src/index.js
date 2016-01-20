import React from 'react';
import { render } from 'react-dom';
import { App } from 'components/App';
import store from 'myRedux/store';

render(<App store={store} />, document.getElementById('root'));
