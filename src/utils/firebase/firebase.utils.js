
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
} from 'firebase/firestore'

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

//native email and password is built into firebase and doesn't need
//a provider, only the method createUserWithEmailAndPassword
//createUserWithEmailAndPassword is async
export const createAuthUserWithEmailAndPassword= async (email, password) =>{
    if(!email || !password)return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword= async (email, password) =>{
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

//receives a userAuthentication object, a function that takes the
//data from userAuth and stores it on the database
//doc() takes 3 inputs, the database, the collection name, and the entry
//the doc() function creates a ref to the database
//each user object has a key uid for unique ID
//getDoc() is async, gets the data for a ref created by doc()
//when making an entry with createAuthUserWithEmailAndPassword
//the display name isn't passed with the userAuth object
//the additionalInformation object and object spreader is used to account for this
//display name will be sent with additionalInformation and overwrite the docRef
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={})=>{
    const userDocRef=doc(db, 'users',userAuth.uid);
    console.log('userDocRef:',userDocRef);

    const userSnapshot= await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    
    //checks if user doesn't exist
    //if user does exist on the database this code is ignored
    //if it doesn't exist, name,email and date is inputted
    //into the database using the setDoc() function
    //setDoc() is async, takes 2 inputs, the ref and the data object to send
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
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;
}

export const signOutUser=async ()=>signOut(auth);

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);






// collection and write batch
export const addCollectionAndDocuments= async(collectionKey, objectsToAdd)=>{
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
export const getCategoriesAndDocuments= async()=>{
    const collectionRef=collection(db,'categories');
    const q =query(collectionRef);

    const querySnapshop=await getDocs(q);
    // const categoryMap=querySnapshop.docs.reduce((acc,docSnapshot)=>{
    //     const {title,items}=docSnapshot.data();
    //     acc[title.toLowerCase()]=items;
    //     return acc;
    // },{})
    // return categoryMap;
    return querySnapshop.docs.map(docSnapshot=>docSnapshot.data());
}


