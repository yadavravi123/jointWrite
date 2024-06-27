import React, { useState,useEffect } from "react";
import Home from "./components/Home";
import {Routes,Route} from "react-router-dom"
import EditorPage from "./components/EditorPage";
import "./App.css"
// import { socket } from "./socket";
// const serverURL=`http://localhost:3000`;
// import {io} from "socket.io-client"
import {Toaster} from "react-hot-toast"
function App(){
 
  return <>
  <Toaster position="top-center"/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/editor/:Id" element={<EditorPage/>}/> 
    </Routes>
  </>
}
export default App; 