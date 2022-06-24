import { useEffect } from "react";
import { createContext, useState } from "react";

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









export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemToCart: ()=>{},
    cartCount:0,
})

export const CartProvider=({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems, setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);



    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const removeItemToCart=(cartItemToRemove)=>{
        setCartItems(remoteCartItem(cartItems,cartItemToRemove));
    }




    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>{
            return(total=total+cartItem.quantity)
        },0)
        setCartCount(newCartCount);
    },[cartItems])


    const value={
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        cartItems,
        cartCount,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}