import {createSelector} from 'reselect';
import { CartState } from './cart.reducer';
import { RootState } from '../store';

//getting slice of root reducer
const selectCartReducer=(state:RootState):CartState=>state.cart;

//a memoized way of selecting cartitems and iscartopen
export const selectCartItems= createSelector(
    [selectCartReducer],
    (cart)=>cart.cartItems
);
export const selectIsCartOpen= createSelector(
    [selectCartReducer],
    (cart)=>cart.isCartOpen
);


//A memoized selector that takes in cartItems and returns count and total
export const selectCartCount=createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce(
        (total,cartItem)=>total+cartItem.quantity,
        0
    )
);
export const selectCartTotal=createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce(
        (total,cartItem)=>total+cartItem.quantity*cartItem.price,
        0
    )
);
