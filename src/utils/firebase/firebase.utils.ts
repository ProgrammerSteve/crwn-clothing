
import { initializeApp } from "firebase/app";

//Auth is for Authentication
import {
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

    User,
    NextOrObserver,
} from 'firebase/auth';

//firestore is the database for firebase
import{
    getFirestore,
    doc,
    setDoc,
    getDoc,

    collection, //allow us to get a collection ref
    writeBatch, //for transactions

    query,
    getDocs,

    QueryDocumentSnapshot,
} from 'firebase/firestore'



import {
    Category
} from '../../store/categories/category.types'





// Your web app's Firebase configuration
// You can find this info on the firebase website
const firebaseConfig = {
  apiKey: "AIzaSyDSLFJUdXxn79u_U9UXx0fxEjmbUUL5tH0",
  authDomain: "crwn-clothing-db-4a04c.firebaseapp.com",
  projectId: "crwn-clothing-db-4a04c",
  storageBucket: "crwn-clothing-db-4a04c.appspot.com",
  messagingSenderId: "605842874681",
  appId: "1:605842874681:web:bcc8e9648a591c02a088e8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Provider
const provider= new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})








export const createAuthUserWithEmailAndPassword= async (
    email:string, 
    password:string
    ) =>{
    if(!email || !password)return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword= async (
    email:string, 
    password:string
    ) =>{
    if(!email || !password)return;
    return await signInWithEmailAndPassword(auth, email, password);
}











//Auth
export const auth=getAuth();

//signInWithGooglePopup
export const signInWithGooglePopup=()=>{
    return signInWithPopup(auth, provider);
}

//signInWithGoogleRedirect
export const signInWithGoogleRedirect=()=>{
    return signInWithRedirect(auth,provider);
}

//instantiated the firestore database
export const db=getFirestore();











export type AdditonalInformation={
    displayName?: string;
}
export type UserData={
    createdAd: Date;
    displayName: string;
    email:string;
}
export const createUserDocumentFromAuth = async (
        userAuth: User, 
        additionalInformation={} as AdditonalInformation,
    ): Promise<void | QueryDocumentSnapshot<UserData>>=>{
    const userDocRef=doc(db, 'users',userAuth.uid);
    console.log('userDocRef:',userDocRef);
    const userSnapshot= await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const{displayName, email}=userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating user', error);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}








export const signOutUser=async ()=>signOut(auth);






export const onAuthStateChangedListener=(callback: NextOrObserver<User> )=>
    onAuthStateChanged(auth,callback);








export type ObjectToAdd={
    title:string;
}
// collection and write batch
export const addCollectionAndDocuments= async <T extends ObjectToAdd>(
    collectionKey: string, 
    objectsToAdd: T[],
    ): Promise<void> =>{
    const collectionRef = collection(db, collectionKey);
    const batch= writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    })
    await batch.commit();
    console.log('done');

}





//querying data, note: categories is the collectionKey
export const getCategoriesAndDocuments= async(): Promise<Category[]> =>{
    const collectionRef=collection(db,'categories');
    const q =query(collectionRef);
    const querySnapshop=await getDocs(q);
    return querySnapshop.docs.map(docSnapshot=>docSnapshot.data() as Category);
}





export const getCurrentUser=(): Promise<User|null>=>{
    return new Promise((resolve, reject)=>{
        const unsubscribe=onAuthStateChanged(
            auth, 
            (userAuth)=>{
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    })
}