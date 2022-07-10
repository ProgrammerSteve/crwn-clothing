import {
    AnyAction,
} from 'redux';
import {
    Category,
} from './category.types';
import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
} from './category.action';

export type CategoriesState={
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error |null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState={
    categories:[],
    isLoading: false,
    error:null,
}

//matchable patterns instead of switch statement, matches action with if statements
export const categoriesReducer=(
    state=CATEGORIES_INITIAL_STATE,
    action={} as AnyAction
): CategoriesState=>{
    if(fetchCategoriesStart.match(action)){
        return {...state, isLoading:true};
    }
    if(fetchCategoriesSuccess.match(action)){
        return {...state, categories: action.payload, isLoading:false}
    }
    if(fetchCategoriesFailure.match(action)){
        return {...state,error:action.payload ,isLoading:false}
    }
    return state;
}

