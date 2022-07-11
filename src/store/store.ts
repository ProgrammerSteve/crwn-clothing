import {compose,createStore,applyMiddleware, Middleware} from 'redux';
import { persistStore, persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

export type RootState= ReturnType<typeof rootReducer>


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?:typeof compose
  }
}





const sagaMiddleware=createSagaMiddleware();





//3rd parameter in createStore
const middleWares = [
    process.env.NODE_ENV === 'development' && logger,
    sagaMiddleware,
    thunk,
  ].filter((middleware): middleware is Middleware=> Boolean(middleware));






//will use composeEnhancer instead of compose in order
//to use redux dev tools on google chrome
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;





type ExtendedPersistConfig=PersistConfig<RootState> & {
  blacklist: (keyof RootState)[]
}
const persistConfig: ExtendedPersistConfig={
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

//after store is instantiated, we run the sagaMiddleware
sagaMiddleware.run(rootSaga);

export const persistor=persistStore(store);