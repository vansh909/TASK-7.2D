import React from 'react'
import "./Articles.css";
import { useEffect, useState } from 'react';
import { db } from './Firebase_Config';
import {collection, getDocs, addDoc } from "firebase/firestore"


function Articles() {
  const [newDate, setNewDate] = useState(0)

  const [newDesc, setNewDesc] = useState("")
  const [setTitle, setNewTitle] = useState("")
  const [setTag, setNewTag]= useState("")
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "question")
  const createUser = async () => {
    await addDoc(usersCollectionRef, {desc: newDesc, title:setTitle, tag: setTag})
}

  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
    }
    getUsers()
  }, [])
  return (
    <div className="Container">
        <h2 className='heading'> What Do You Like To Share</h2>
        <form className='form'> 
            Title <input className='input' type="text" onChange={(event)=>{
              setNewTitle(event.target.value)
            }}/>
        
            <div className='problem'>
             DESCRIBE YOUR PROBLEM:
            </div>
            {/* <textarea name="" id="text" cols="30" rows="10"></textarea> */}
            <input type="text" id='prob' onChange={(event)=> {
        setNewDesc(event.target.value); }} />
        </form>
        <div className="tags">
          Tags
        <input className='tags_input' type="" placeholder='Please add upto 3 tags to describe your article' onChange={(event)=>{
          setNewTag(event.target.value)
        }}/>
    </div>
        <button onClick={createUser} className='btn ' >Post</button>
    </div>


  );
}

export default Articles
