import firebase_app from "../config";
import { getFirestore, doc, setDoc, addDoc, getDocs,getDoc, collection, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

// add data to a collection
export async function addData(collectionName, id, data) {
    
    let result = null;
    let error = null;

    try {
        // Define the collection and document data
        const myCollection = collection(db, collectionName);
        
        // Add the document to the collection
        const result = await addDoc(myCollection, data);


    } catch (e) {
        error = e;
    }

    return { result, error };
}

// get all data from a collection
export async function getData(collectionName) {
    
    let result = null;
    let error = null;

    try {

        const collectionRef = collection(db, collectionName)
        const querySnapshot = await getDocs(collectionRef)
        result = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

       console.log(result);

    } catch (e) {
        error = e;
    }

    return { result, error };
}


export async function getSingleData(collectionName, id) {
    
    let result = null;
    let error = null;

    try {

        const docRef = doc(db, collectionName , id);
        const docSnap = await getDoc(docRef);
        result = docSnap.data();

    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateData(collectionName, id, data) {

    let result = null;
    let error = null;
    
    try {
        
        const docRef = doc(db, collectionName, id);

        const docSnap = await updateDoc(docRef, data);
       

    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function deleteData(collectionName, id) {

    let result = null;
    let error = null;
    
    try {
        
        const docRef = doc(db, collectionName , id);

        const docSnap = await deleteDoc(docRef)
       

    } catch (e) {
        error = e;
    }

    return { result, error };
}

