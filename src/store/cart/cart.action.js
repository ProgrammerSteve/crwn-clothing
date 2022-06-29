import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem=(cartItems,productToAdd)=>{
    const exisitingCartItem=cartItems.find(
        (cartItem)=>{
            return(cartItem.id===productToAdd.id);
        }
    );

    if(exisitingCartItem){
        return(cartItems.map((cartItem)=>
            cartItem.id===productToAdd.id
                ?{...cartItem, quantity:cartItem.quantity+1}
                :cartItem
        ));
    }else{
        return[...cartItems, {...productToAdd, quantity:1}]
    }
}

const remoteCartItem=(cartItems,cartItemToRemove)=>{
    const exisitingCartItem=cartItems.find((cartItem)=>cartItem.id===cartItemToRemove.id);
    if(exisitingCartItem.quantity===1){
        return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id)
    }else{
        return cartItems.map((cartItem)=>cartItem.id===cartItemToRemove.id?{...cartItem, quantity:cartItem.quantity-1}:cartItem);
    }
}

const clearCartItem=(cartItems, cartItemToClear)=>{
    return cartItems.filter(cartItem=>cartItem.id!==cartItemToClear.id)
}






export const setIsCartOpen=(boolean)=>{
    return(
        createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean)
    );
}







export const addItemToCart=(cartItems, productToAdd)=>{
    const newCartItems=addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const removeItemFromCart=(cartItems, cartItemToRemove)=>{
    const newCartItems=remoteCartItem(cartItems,cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
export const clearItemFromCart=(cartItems, cartItemToClear)=>{
    const newCartItems=clearCartItem(cartItems,cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

