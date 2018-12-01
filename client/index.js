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
      useNextVariants: true,
      fontFamily: [
        'Raleway',
        // 'Permanent Marker',
      ].join(','),
    },
});

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
