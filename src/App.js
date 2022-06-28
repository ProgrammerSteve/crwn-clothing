import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import Navigation from './routes/navigation/navigation.component';
import Checkout from './routes/checkout/checkout.component';
import {Routes, Route} from "react-router-dom";

import { 
  useEffect,
} from "react";

import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils'

import { setCurrentUser } from './store/user/user.action';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

const App=()=>{
  const dispatch=useDispatch();
  

  useEffect(()=>{
    const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  },[dispatch])

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='auth' element={<Authentication/>}/>
      </Route>
    </Routes>
  );
}

export default App;
