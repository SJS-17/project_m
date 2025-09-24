import React,{useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";

export default function Login() {
    const [userID,setUserID]=useState("");
    const [password,setPassword]=useState("");
    const [loginSuccess,setloginSuccess]=useState(false);
    const nav=useNavigate();

    async function handleSignIn() {
        const res=await fetch("https://localhost:3000/api/users", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uname: userID, pword:password})
        }); 
        const data=await res.json();
        if (data.success) {
            setloginSuccess(true);
        }
    }

    return (
        <div>
            Sign in
            Username:
            <input type='text' placeholder='Username' onChange={(e)=>{setUserID(e.target.value)}} /> {/*may be something wrong here*/}
            Password:
            <input type='password' onChange={(e)=>{setUserID(e.target.value)}}/> {/*may be something wrong here*/}
            <button onClick={handleSignIn()}>Submit</button>
            {loginSuccess ? <Navigate to={`/Home/${userID}`}/> : <div>Invalid Username or Password. Need to fix later</div>}

            <button onClick={()=>{nav('/CreateAccount')}}>
                Create an Account?
            </button>
        </div>
    )
}