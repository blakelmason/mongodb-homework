//react
import React from 'react';
import ReactDOM from 'react-dom';

//packages
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import App from './App';

//service worker
import registerServiceWorker from './registerServiceWorker';

//render
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
