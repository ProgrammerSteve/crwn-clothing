
import {useState} from 'react';
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';
import {
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";


import FormInput from '../form-input/form-input.component';
import{
    SignUpContainer,
    ButtonsContainer,
}from './sign-in-form.styles.jsx';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignInForm = ()=>{

    const [formFields,setFormFields]=useState(defaultFormFields);
    const {email, password}= formFields;

    const restFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle= async ()=>{
        await signInWithGooglePopup();
    }

    const handleSubmit= async (event)=>{
        event.preventDefault();
        try{
            const {user}= await signInAuthUserWithEmailAndPassword(email,password);
            console.log(user);
            restFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email ')
                    break
                default:
                    console.log(error)
            }
        }
    };


    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormFields(
            {
                ...formFields, 
                [name]:value,
            }
        )
    };

    return(
        <SignUpContainer>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(event)=>{handleSubmit(event)}}>

                <FormInput
                label="Email" 
                type="email" 
                required
                onChange={handleChange}
                name="email"
                value={email}
                />

                <FormInput
                label="Password" 
                type="password" 
                required
                onChange={handleChange}
                name="password"
                value={password}
                />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button> 
                    <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button> 
                </ButtonsContainer>
                                       
            </form>
        </SignUpContainer>
    )
}

export default SignInForm;