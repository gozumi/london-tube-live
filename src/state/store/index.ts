import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { startListeningToAuthChanges } from '../action-creators'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [ thunk ]
const enhancers: Array<any> = []

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     typeof window === 'object' && typeof (window as any).devToolsExtension !== 'undefined' ? (window as any).devToolsExtension() : (f: any) => f
//   )
// )

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )
)

store.dispatch(startListeningToAuthChanges())

export default store
