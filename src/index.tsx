import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { rootReducer } from './redux/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';

const app = initializeApp(firebaseConfig);

const store = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
