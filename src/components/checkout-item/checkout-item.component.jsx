import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import{
CheckoutItemContainer,
ImageContainer,
ImageStyled,
Name,
Quantity,
Price,
Value,
Arrow,
RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem=({cartItem})=>{
    const {name,imageUrl,price,quantity}=cartItem;
    const {
        clearItemFromCart,
        addItemToCart,
        removeItemToCart,
    }=useContext(CartContext);

    const clearItemHandler=()=>{
        clearItemFromCart(cartItem)
    }
    const addItemHandler=()=>{
        addItemToCart(cartItem)
    }
    const removeItemHandler=()=>{
        removeItemToCart(cartItem)
    }

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <ImageStyled src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow> 
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}
export default CheckoutItem;