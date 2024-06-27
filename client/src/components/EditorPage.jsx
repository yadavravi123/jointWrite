import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Client from "./Client"
import Editor from "./Editor"
import { socket } from "../socket"
import { useNavigate } from "react-router-dom"
function EditorPage(){
        const location=useLocation();
        const {socketId,username}=location.state;
        const state=location.state;
        const navigate=useNavigate();
        const [clients,setClients]=useState([]) 
        
        socket.on('join',({updatedClientList,updatedContent})=>{
            console.log('updated list',updatedClientList);
            console.log('updated content',updatedContent);
            // console.log('editor page join');
            setClients(updatedClientList);
        })
        socket.on('disconnect',(reason)=>{

        })
        socket.on('leaving-room',(updatedClientList)=>{
            console.log('a user left room');
            setClients(updatedClientList);
        })

        function handleLeaveRoom(){
            socket.disconnect();  
            navigate("/");
        }
    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-md-2 bg-dark text-light d-flex flex-column h-100">
                <div className="d-flex flex-column overflow-auto">jointWrite</div>
                    {clients.map((client)=>{
                       return <Client key={client.socketId} username={client.username}/>
                    })}  
                    <div className="mt-auto">
                        <hr />
                        <button className="btn btn-success mb-2 px-3">Copy Room Id</button>
                        <button onClick={handleLeaveRoom} className="btn btn-danger mb-2 px-3">Leave Room</button>
                    </div>
                </div>
                <div className="col-md-10 text-light d-flex flex-column">
                    <Editor/>
                </div>
            </div>
        </div>
    )
}
export default EditorPage;