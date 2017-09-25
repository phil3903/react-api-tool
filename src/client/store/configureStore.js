import { createStore, applyMiddleware } from 'redux'
import { logger, crashReporter } from '../middleware/loggingMiddleware'
import socketMiddleware  from '../socket/manager/socketMiddleware'
import configureSocket, { INIT_SOCKET } from '../socket/manager/configureSocket'
import { socketEvents } from '../socket/events'
import routerMiddleware from '../middleware/routerMiddleware'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers/_root_reducer'

function configureStore(initialState, history){

  const sagaMiddleware = createSagaMiddleware()
  const socketConfig = configureSocket('', { query: 'token=' + localStorage.getItem('something') })

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware,
      socketMiddleware(socketConfig, socketEvents),
      routerMiddleware(history),
      logger,
      crashReporter
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  store.dispatch(INIT_SOCKET)
  return store
}

export default configureStore