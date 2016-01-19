import React from 'react';
import { render } from 'react-dom';
import { App } from 'components/App';
import { flux } from 'application/flux'

render(<App flux={flux} />, document.getElementById('root'));
