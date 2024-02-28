'use client'
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { logOut } from "@/firebase/auth/signin";
import { addData, getData, getSingleData, updateData, deleteData } from "@/firebase/firestore/addData";

function Page() {
   
    const { user } = useAuthContext()
    const router = useRouter()

    const [userName, setUserName] = useState();
    const [houseName, sethouseName] = useState();
    const [customers, setCustomers] = useState([]);

    const [isAdded, setIsAdded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    //console.log(user);
    useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    const logOutFn = async () =>{
        
        const { result, error } = await logOut();

        if (error) {
            return console.log(error)
        }

        return router.push("/")
    }

    const handleForm = async (event) =>{
        event.preventDefault();
        
        const data = {
            name: userName,
            house: houseName
          }
        const { result, error } = await addData('customers', null , data)
    
        if (error) {
            return console.log(error)
            setIsAdded(false);

        }else{
            setUserName('');
            sethouseName('');
            setIsAdded(true);
            console.log(result);
        }
    }

    const handleUpdateData = async (userId) => {
        
        console.log(userId);

        const data = {
            name: "New name",
            house: "New House Name"
        }
        

        const { result, error } = await updateData('customers', userId, data)
    
        if (error) {
            setIsUpdated(false);
            return console.log(error)
        }else{
            setIsUpdated(true);
            console.log(result);
        }
    }

    const handleDelete = async (userId) => {

        const { result, error } = await deleteData('customers', userId)
    
        if (error) {
            return console.log(error)
            setIsDeleted(false);
        }else{
            setIsDeleted(true);
            console.log(result);
        }

    }

    useEffect(()=>{

        async function getAllCustomers(){

            setIsAdded(false);
            setIsUpdated(false);
            setIsDeleted(false);

            const { result, error } = await getData('customers')
    
            if (error) {
                return console.log(error)
            }else{
                setCustomers(result);
            }
        }

        getAllCustomers();

    },[isUpdated, isDeleted, isAdded ])


    return (
    <div>
        <h1>Only logged in users can view this page</h1>
        <button onClick={()=> logOutFn()}>Logout</button>

        <section>
            <div className="form-wrapper">
                {/* <h1 className="mt-60 mb-30">Sign up</h1> */}
                <form onSubmit={handleForm} className="form">
                    <label htmlFor="username">
                        <p>Username</p>
                        <input onChange={ (e) => { setUserName(e.target.value) }} value={ userName } required type="text" name="username" id="username" placeholder="User Name" />
                    </label>
                    <label htmlFor="housename">
                        <p>House Name</p>
                        <input onChange={ (e) => { sethouseName(e.target.value) }} value={ houseName } required type="text" name="housename" id="housename" placeholder="House Name" />
                    </label>
                    <button type="submit">Add Data</button>
                </form>
            </div>
        </section>

        <section>
            <table>
                <tr>
                    <th>Name</th>
                    <th>House Name</th>
                </tr>
                { customers.map(items => (
                    <tr key={ items.id }>
                        <td onClick={ ()=>{ handleUpdateData(items.id) }}>{ items.name}</td>
                        <td>{ items.house}</td>
                        <td onClick={ ()=>{ handleDelete(items.id) }}>Delete</td>
                    </tr>
                ))} 
            </table>
        </section>
    </div>
    );
}

export default Page;