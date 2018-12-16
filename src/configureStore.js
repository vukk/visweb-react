import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRoutes } from 'redux-first-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { reducer as formReducer } from 'redux-form'

import reducers from './modules/main/reducers';
import sagas from './modules/main/sagas';

/*- Router -------------------------------------------------------------------*/

// routing, see /src/modules/main/App.js too
const routesMap = {
  HOME: '/',
  LOADING: '/loading',
  VISUALIZE: '/visualize',
  HELP: '/help',
  MENU: '/menu',
};

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer,
} = connectRoutes(routesMap);

/*- Sagas --------------------------------------------------------------------*/

const sagaMiddleware = createSagaMiddleware();
const rootSaga = sagas;

/*- Middleware ---------------------------------------------------------------*/

const enhancers = composeWithDevTools(
  routeEnhancer, applyMiddleware(sagaMiddleware, routeMiddleware)
);

/*- Export -------------------------------------------------------------------*/

const rootReducer = combineReducers({
  location: routeReducer,
  form: formReducer,
  ...reducers,
});

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancers);
  sagaMiddleware.run(rootSaga);
  return store;
}
