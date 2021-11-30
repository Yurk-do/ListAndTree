import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { rootReducer } from './redux/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCoElE9vn8GKOi9I-6zRbA1MI0n6IpJ2mo',
  authDomain: 'listandtree.firebaseapp.com',
  databaseURL:
    'https://listandtree-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'listandtree',
  storageBucket: 'listandtree.appspot.com',
  messagingSenderId: '193570890135',
  appId: '1:193570890135:web:088e6e7a435fbdf59e24d2',
};

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
