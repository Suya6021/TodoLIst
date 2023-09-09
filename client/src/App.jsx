/* eslint-disable no-unused-vars */
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState,useEffect } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './App.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import Button  from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
function App() {
  const [todos,setTodos]=useState([]);
  const [popupActive,setPopupActive]=useState(false);
  const[newtodo,setNewTodo]=useState("");
  const url="http://127.0.0.1:3000"
  useEffect(()=>{
    GetTodos();
   
  },[])
 

  
  const GetTodos =async () => {
    try{
      const res=await fetch(url+"/todos");
      const data=await res.json();
    
      setTodos(data);
    }
    catch(error){
      console.log(error);
    }}
 const DeleteTodo=async id=>{
  const data=await fetch(url+'/todos/delete/'+id,{
    method:"DELETE"
  })
   .then(res=>res.json());
   setTodos(todos=>todos.filter(todo=>todo._id !==data._id));
 }
 const addTodo= async()=>{
  
  const data=await fetch(url+"/todos/new", {
    method:"POST",
    headers:{
  "Content-Type":"application/json"
},
   body:JSON.stringify({
    text:newtodo
   })})
  .then(res=>res.json())
  setTodos([...todos,data]);
  setPopupActive(false)
  setNewTodo("")
 }
  
  return (
    <>
      <div className="bg-cover bg-no-repeat bg-center h-[100vh] flex flex-col justify-center items-center" id='main'>
        <div className='flex flex-col bg-gradient-to-r from-cyan-500 to-blue-500 w-1/2 h-full rounded-2xl p-8 relative'>
        <h1 className='text-center text-4xl p-8'>Welcome to Todo List</h1>
        <h4>Tasks to Be Done:</h4>
        {todos.map(todo=>(
        <div className={'flex bg-gradient-to-r from-violet-500 to-fuchsia-500 relative p-3 '+"todo"}  key={todo._id}
        >
        
        <Checkbox icon={<BookmarkBorderIcon />}checkedIcon={<BookmarkIcon />}
 className='h-10 ' 
 /> 
      <div className={'pt-[7px] text-center'} >{todo.text}</div>
    <HighlightOffIcon onClick={()=>DeleteTodo(todo._id)} className='cursor-pointer  absolute right-3   h-10 '  />
        </div>))}
     <AddIcon onClick={()=>setPopupActive(true)} className='rounded-full bg-gradient-to-r-from black-500 h-12 w-12 absolute right-11 bottom-11 '/>
     </div>
       {popupActive ?(
        <div className='fixed justify-center align-middle w-full max-w-md bg-slate-200 flex overflow-visible'>
         <BlockIcon onClick={()=>setPopupActive(false)} className='absolute right-0 cursor-pointer p-1 h-8'/>
         <div className='flex flex-col w-full p-2'>
          <h3 className='text-lg p-1'>ADD TASK</h3>
          <input type="text"
         onChange={e => setNewTodo(e.target.value)}
          value={newtodo}
          className='w-full p-1 m-2 border-solid border-5 border-black'/>
          <Button variant="contained" endIcon={<SendIcon />} onClick={addTodo} className='p-2 w-full m-2 bg-black'>
  Send
</Button>
         </div>
        </div>
       ) : ''}
       
       
      </div>
    </>
  )
}

export default App
