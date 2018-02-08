import { createStore, applyMiddleware } from 'redux'
import { logger, crashReporter } from '../middleware/loggingMiddleware'
import routerMiddleware from '../middleware/routerMiddleware'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers/_root_reducer'
import responseTimeMiddleware from '../middleware/responseTimeMiddleware'

function configureStore(initialState, history){

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      responseTimeMiddleware(),
      sagaMiddleware,
      routerMiddleware(history),
      logger,
      crashReporter
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}

export default configureStore