import React, { useEffect,useRef, useState } from "react";
import { socket } from "../socket";
import {Editor as MEditor} from "@monaco-editor/react";

function Editor(){
    const [content,setContent]=useState("");
    const textAreaRef = useRef(null);
    socket.on('content-edited',(updatedContent)=>{
        console.log('updated content',updatedContent);
        setContent(updatedContent);
    })
    socket.on('join',({updatedClientList,updatedContent})=>{
        console.log('joined',updatedContent);
        setContent(updatedContent);
    })
    //  function handleEdit(e){
    //     socket.emit("content-edited",e.target.value);
    //     const cursorPos=e.target.currentCursor;
    //     textAreaRef.current.selectionStart=10;
    //     textAreaRef.current.selectionEnd=10;
    // }
    return (
        <div style={{height:"600%"}}>
            {/* <textarea ref={textAreaRef} value={content} onChange={handleEdit} className="editor-txtarea" name="" id=""  cols="100"></textarea> */}
            <MEditor
            height="calc(100vh - 50px)"
            defaultLanguage="python"
            value={content}
            defaultValue="# Enter your code here"
            onChange={(value) => {socket.emit("content-edited",value); }}
            />
        </div>
    )
}
export default Editor;