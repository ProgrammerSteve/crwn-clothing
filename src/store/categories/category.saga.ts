// import {takeLatest, all, call, put} from 'redux-saga/effects';
// replace redux-saga/effects with typed-redux-saga
// replace yield with yield*
// "downlevelIteration": true, was added in tsconfig file
import {takeLatest, all, call, put} from 'typed-redux-saga/macro';



import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess,fetchCategoriesFailure } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';






export function* fetchCategoriesAsync(){
    try{
        const categoriesArray= yield* call(getCategoriesAndDocuments);  
        yield* put(fetchCategoriesSuccess(categoriesArray))
    }catch(error){
        put(fetchCategoriesFailure(error as Error))
    }
}





//when action: FETCH_CATEGORIES_START is received, fetchCategoriesAsync is called
export function* onFetchCategories(){
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync)
}





export function* categoriesSaga(){
    yield* all([call(onFetchCategories)])
}





