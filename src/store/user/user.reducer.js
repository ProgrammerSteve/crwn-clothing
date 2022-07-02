import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE={
    currentUser:null,
    isLoading:false,
    error:null,
}

// Redux Thunk version
// export const userReducer=(state=USER_INITIAL_STATE,action={})=>{
//     const {type, payload}=action;
//     switch(type){
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser:payload,
//             }
//         default:
//             return state;
//     }
// }


export const userReducer=(state=USER_INITIAL_STATE,action={})=>{
    const {type, payload}=action;
    switch(type){
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:payload,
            }
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return {
                ...state,
                error:payload,
            }
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
                return {
                    ...state,
                    error:payload,
                }
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return {
                ...state,
                error:payload,
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser:null,
            }
        default:
            return state;
    }
}
