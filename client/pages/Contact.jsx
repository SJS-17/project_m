import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';


export default function Contact() {
    const {u1, u2}=useParams();
    const [sharedMessages,setSharedMessages]=useState([]);
    const [text,setText]=useState("");

    useEffect(()=>{
        async function fetchMessages() {
            const res=await fetch("https://localhost:3000/api/messages", {
                method: GET,
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({user1: u1, user2: u2})
            });
            const data=await res.json();
            setSharedMessages(data);
        }
        fetchMessages();
    })

    async function handleSubmit(string) {
        res=await fetch("https://localhost:3000/api/messages", {
            method: POST,
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({sender: u1, receiver: u2, message: text})
        });
        const data=await res.json();
        if (data.success) {
            setText("");
        }
        if (!data.success) {
            console.log(data.message);
        }
    }

    return (
        <div>
            <h1>{u2}</h1>
            <ul>
                {
                    sharedMessages.map((message,i)=> {
                        <li key={i}>{message.sender}: {message.message}</li>
                    })
                }
            </ul>
            


        </div>
    );
}