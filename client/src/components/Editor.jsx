import React, { useEffect,useRef, useState } from "react";
import { socket } from "../socket";

function Editor(){
    const [content,setContent]=useState("");
    socket.on('content-edited',(updatedContent)=>{
        // console.log('updated content',updatedContent);
        setContent(updatedContent);
    })
    socket.on('join',({updatedClientList,updatedContent})=>{
        console.log('joined',updatedContent);
        setContent(updatedContent);
    })
     function handleEdit(e){
        socket.emit("content-edited",e.target.value);
    }
    return (
        <div style={{height:"600%"}}>
            <textarea value={content} onChange={handleEdit}className="editor-txtarea" name="" id=""  cols="100"></textarea>
        </div>
    )
}
export default Editor;