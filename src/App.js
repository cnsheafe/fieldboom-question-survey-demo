import React from 'react'
import { Router } from 'react-static'
//
import Routes from 'react-static-routes'
//
import { Provider } from 'react-redux'
import store from './connectors/redux'

// import './styles/home.scss';
// import './app.css'

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
