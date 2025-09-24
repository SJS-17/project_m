import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link, Navigate, useNavigate} from "react-router-dom";

export default function Home() { {/*Gonna need a user argument here or maybe not or maybe yes*/}
    const {username}=useParams();
    const [users,setUsers]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        async function fetchAllUsers() {
            const res=await fetch("https://localhost:3000/api/users", {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
            }); 
            const data=await res.json();
            if (data.success) {
                setUsers(data.allUsers);
            }
            else {
                console.log("failed to fetch all users");
            }
        }
        fetchAllUsers();
    },[])

    return (
        <ul>
            {users.length()==0 ? <div>No users here</div> :
            (users.map((user,i)=>{
                return (
                    <li key={i}>
                    <button> {user.name} </button>
                    </li>
                )
            }))
            }
        </ul>
    )
}