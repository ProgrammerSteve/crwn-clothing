import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase.utils';


import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.styles.jsx';

const Navigation=()=>{
    const {currentUser}=useContext(UserContext);
    const {isCartOpen,setIsCartOpen}=useContext(CartContext);
    return(
      <Fragment>
        <NavigationContainer>


          <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
          </LogoContainer>

          <NavLinks>
            <NavLink to="/shop">
              Shop
            </NavLink>
            {
              (currentUser)?
              <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
              :<NavLink to="/auth">Sign In</NavLink>
            }
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}





        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;