import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';

function loadNavState() {
   try {
      const state = localStorage.getItem('bb-showNav');
      if (state) {
         return {
            session: {
               showNav: JSON.parse(state),
            },
         };
      }
   } catch {
      //do nothing
   }
}

const state = loadNavState()

const store = configureStore(state);

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <ModalProvider>
            <App />
         </ModalProvider>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);
