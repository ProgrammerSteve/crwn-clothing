import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import Navigation from './routes/navigation/navigation.component';
import Checkout from './routes/checkout/checkout.component';

import {GlobalStyle} from './global.styles.js';

import {Routes, Route} from "react-router-dom";

import { 
  useEffect,
} from "react";

import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCurrentUser,
} from './utils/firebase/firebase.utils'

import { 
  setCurrentUser, 
  checkUserSession,
} from './store/user/user.action';
import {
  useDispatch,
} from 'react-redux';

const App=()=>{



  const dispatch=useDispatch();
  //redux thunk
  // useEffect(()=>{
  //   const unsubscribe = onAuthStateChangedListener((user)=>{
  //       if(user){
  //           createUserDocumentFromAuth(user);
  //       }
  //       dispatch(setCurrentUser(user));
  //   });
  //   return unsubscribe;
  // },[])

  //redux-saga
  useEffect(()=>{
   dispatch(checkUserSession())
  },[])

  return (
    <div>
    <GlobalStyle/>
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='auth' element={<Authentication/>}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
