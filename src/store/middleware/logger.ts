import { Middleware } from "redux";
import { RootState } from "../store";

//3 functions that return from one another
//need to understand currying, a function that returns anothe function
//custon middleware
export const loggerMiddleware: Middleware<{}, RootState>=(store)=>(next)=>(action)=>{
    if(!action.type){
        return next(action);
    }
    console.log('type',action.type)
    console.log('payload',action.payload)
    console.log('currentState',store.getState())
    next(action);
    console.log('next state',store.getState())
}