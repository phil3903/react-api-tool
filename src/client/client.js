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

const history = createHistory()
const store = configureStore(window.__initialState__, history)

// configureSocket(store)
store.runSaga(rootSaga)

// mount app
ReactDOM.render(
  <Provider store={ store } >
    <App history={ history }/>
  </Provider>, document.getElementById('root')
)

// when window is closed remove the token if
// remember "username" isn't set
window.addEventListener('beforeunload', (e) =>{
  e.preventDefault()
  if(!localStorage.getItem('username'))
    localStorage.removeItem('access-token')
})