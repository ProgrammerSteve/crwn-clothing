import { 
    useState, 
    createContext, 
    useEffect,
} from "react";

import { 
    onAuthStateChangedListener,
    signOutUser,
    createUserDocumentFromAuth,
} from '../utils/firebase.utils'

export const UserContext = createContext({
    setCurrentUser: ()=>null,
    currentUser: null,
});


export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser]= useState(null);
    const value= {currentUser, setCurrentUser};

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            setCurrentUser(user);
            if(user){
                createUserDocumentFromAuth(user);
            }
        });
        return unsubscribe;
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
