import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store/configureStore'
import rootSaga from './sagas/_root_saga'
import App from './containers/App'
import './vendor/fonts/font.css'
import './vendor/fonts/material-icons.css'
import './styles/style.css'

import docFile from 'json-loader!yaml-loader!../docs/docs.yaml'

const history = createHistory()
const store = configureStore(window.__initialState__, history)

// configureSocket(store)
store.runSaga(rootSaga)

// mount app
ReactDOM.render(
  <Provider store={ store } >
    <App history={ history } docFile={docFile}/>
  </Provider>, document.getElementById('root')
)