import { useEffect } from "react";
import {getRedirectResult} from 'firebase/auth';

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { 
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
 } from "../../utils/firebase.utils";
import './authentication.styles.scss';
const Authentication=()=>{

    //You need to use getRedirectResult provided by the firebase/auth library
    //You can't use the other method since it's a different webpage
    // useEffect(async function(){
    //     const response=await getRedirectResult(auth);
    //     console.log('response: ',response);
    //     if(response){
    //        const userDocRef= await createUserDocumentFromAuth(response.user); 
    //     }
    // },[])

    // const logGoogleUser= async ()=>{
    //     const response= await signInWithGooglePopup();
    //     console.log('response: ',response);
    //     const userDocRef= await createUserDocumentFromAuth(response.user);
    // }





    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>           
        </div>
    );
}
export default Authentication;