import React from 'react'
import { Router } from 'react-static'
//
import Routes from 'react-static-routes'
//
import { Provider } from 'react-redux'
import store from './connectors/redux/store';

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  </Provider>
)
