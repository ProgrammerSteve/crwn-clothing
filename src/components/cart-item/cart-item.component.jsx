import {
CartItemContainer,
ImgStyle,
ItemDetails,
Name,
Price,
} from './cart-item.styles.jsx';

const CartItem=({cartItem})=>{
    const {name,quantity,imageUrl,price}=cartItem;

    return(
    <CartItemContainer>
        <ImgStyle src={imageUrl} alt={`${name}`}/>
        <ItemDetails>
            <Name>{name}</Name>
           <Price>{quantity}x ${price}</Price> 
        </ItemDetails>
    </CartItemContainer>
    )
}
export default CartItem;