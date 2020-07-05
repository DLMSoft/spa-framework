import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getStore, addModel } from './common/store';
import App from './App';
import reduxModels from './models';

reduxModels.forEach(model => addModel(model.default));

const store = getStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);