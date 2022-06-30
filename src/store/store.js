import {compose,createStore,applyMiddleware} from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

//3rd parameter in createStore
const middleWares = [
    process.env.NODE_ENV === 'development' && logger,
    thunk,
  ].filter(Boolean);

//will use composeEnhancer instead of compose in order
//to use redux dev tools on google chrome
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig={
    key: 'root',
    storage: storage,
    blacklist: ['user'],
    // whitelist:  ['cart','categories'],
}
const persistedReducer=persistReducer(persistConfig,rootReducer);
    
//if not on google chrome, composeEnhancer becomes just compose
const composeEnhancers=composeEnhancer(applyMiddleware(...middleWares));

export const store =
    createStore(persistedReducer,undefined,composeEnhancers);

export const persistor=persistStore(store);