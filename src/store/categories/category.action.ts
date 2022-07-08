import {createAction,Action, ActionWithPayload} from '../../utils/reducer/reducer.utils';

import {CATEGORIES_ACTION_TYPES,Category} from './category.types';


export type FetchCategoriesStart= Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess= ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailure= ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,Error>;

export const fetchCategoriesStart=():FetchCategoriesStart=>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess=(categoriesArray:Category[]):FetchCategoriesSuccess=>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesArray);

export const fetchCategoriesFailure=(error:Error):FetchCategoriesFailure=>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error);


export type CategoryAction= FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailure;






//redux thunk method
// import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// export const fetchCategoriesAsync=()=>{
//     return async(dispatch)=>{
//         dispatch(fetchCategoriesStart());
//         try{
//             const categoriesArray= await getCategoriesAndDocuments();  
//             dispatch(fetchCategoriesSuccess(categoriesArray));
//         }catch(error){
//             dispatch(fetchCategoriesFailure(error))
//         }
//     }
// }
