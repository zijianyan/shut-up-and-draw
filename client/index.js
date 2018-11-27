import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import orange from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#ff5900'
      }
    },
    typography: {
      fontFamily: [
        'Permanent Marker',
        // 'BlinkMacSystemFont',
        // '"Segoe UI"',
        // 'Roboto',
        // '"Helvetica Neue"',
        // 'Arial',
        // 'sans-serif',
        // '"Apple Color Emoji"',
        // '"Segoe UI Emoji"',
        // '"Segoe UI Symbol"',
      ].join(','),
    },
});

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
