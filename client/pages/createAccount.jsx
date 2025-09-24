import React, {useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";


export default function createAccount() {
    const [AccountCreated, setAccountCreated]=useState(false);
    const [userID,setUserID]=useState("");
    const [password,setPassword]=useState("");
    const nav=useNavigate();

    async function handleCreateAccount() {
        const res=await fetch("https://localhost:3000/api/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uname: userID, pword:password})
        }); 
        const data=await res.json();
        if (data.success) {
            setAccountCreated(true);
        }
        else {
            console.log(data.message);
        }
    }

    return(
        <div>
            Username:
            <input type='text' placeholder='Username' onChange={(e)=>{setUserID(e.target.value)}} /> {/*may be something wrong here*/}
            Password:
            <input type='password' onChange={(e)=>{setUserID(e.target.value)}}/> {/*may be something wrong here*/}

            <button onClick={()=>{handleCreateAccount()}}>Submit</button>
            {AccountCreated && <Navigate to={`/Home/${userID}`} />}

        </div>
    )


}