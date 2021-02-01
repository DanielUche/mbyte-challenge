import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from './App';
import store from './store';
import 'semantic-ui-css/semantic.min.css';

const render = () => {

  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
}



render();

// enable webpack hot module replacemant
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}
