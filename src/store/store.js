import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';

import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

//3 functions that return from one another
//need to understand currying, a function that returns anothe function
//custon middleware
const loggerMiddleware=(store)=>(next)=>(action)=>{
    if(!action.type){
        return next(action);
    }
    console.log('type',action.type)
    console.log('payload',action.payload)
    console.log('currentState',store.getState())
    next(action);
    console.log('next state',store.getState())
}




//3rd parameter in createStore
const middleWares=[
    logger,
];
const composeEnhancers=compose(applyMiddleware(...middleWares));

export const store =
    createStore(rootReducer,undefined,composeEnhancers);