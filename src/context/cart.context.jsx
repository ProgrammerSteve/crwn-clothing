import { useReducer } from "react";
import { createContext} from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem=(cartItems,productToAdd)=>{
    const exisitingCartItem=cartItems.find(
        (cartItem)=>cartItem.id===productToAdd.id
    );
    if(exisitingCartItem){
        return cartItems.map((cartItem)=>
        cartItem.id===productToAdd.id
            ?{...cartItem, quantity:cartItem.quantity+1}
            :cartItem
        );
    }else{
        return[...cartItems, {...productToAdd, quantity:1}]
    }
}

const remoteCartItem=(cartItems,cartItemToRemove)=>{
    const exisitingCartItem=cartItems.find(
        (cartItem)=>cartItem.id===cartItemToRemove.id
    );
    if(exisitingCartItem.quantity===1){
        return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id)
    }else{
        return cartItems.map((cartItem)=>
            cartItem.id===cartItemToRemove.id
                ?{...cartItem, quantity:cartItem.quantity-1}
                :cartItem
        );
    }
}

const clearCartItem=(cartItems, cartItemToClear)=>{
    return cartItems.filter(cartItem=>cartItem.id!==cartItemToClear.id)
}

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemToCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount:0,
    cartTotal:0,
})

const INITIAL_STATE={
    isCartOpen:false,
    cartItems: [],
    cartCount:0,
    cartTotal:0,
}

export const CART_ACTION_TYPES={
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: `SET_IS_CART_OPEN`,
}

const cartReducer=(state,action)=>{
    const {type, payload}=action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen:payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider=({children})=>{
    const [{cartItems, cartTotal, cartCount, isCartOpen},dispatch]=useReducer(cartReducer,INITIAL_STATE);

    const addItemToCart=(productToAdd)=>{
        const newCartItems=addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemToCart=(cartItemToRemove)=>{
        const newCartItems=remoteCartItem(cartItems,cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart=(cartItemToClear)=>{
        const newCartItems=clearCartItem(cartItems,cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const updateCartItemsReducer=(newCartItems)=>{
        const newCartCount=newCartItems.reduce((total,cartItem)=>{
            return(total=total+cartItem.quantity)
        },0);
        const newCartTotal=newCartItems.reduce((total,cartItem)=>{
            return(total=total+cartItem.quantity*cartItem.price)
        },0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount,
                }
            )
        )
    }

    const setIsCartOpen=(bool)=>{
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_IS_CART_OPEN,
                bool
            )
        )
    }

    const value={
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        clearItemFromCart,
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}