import React,{useState,useEffect} from 'react'
import {db} from '../firebase'
import {useHistory} from 'react-router-dom'

let unsubscribe = ()=>{}
export default function Todo({user}) {
    const [text,setText]= useState('')
    const [mytodos,setTodos]= useState([])
     const history=useHistory()

     useEffect(() => {
         if(user){
             const docRef=db.collection('todos').doc(user.uid)
             unsubscribe  = docRef.onSnapshot(docSnap=>{
                 if(docSnap.exists){
                    setTodos(docSnap.data().todos)
                 }else{
                     console.log("no data")
                 }
             })
         }else{
             history.push('/login')
         }
         return () => {
             unsubscribe()
         }
     }, [])

     const addTodo = ()=>{
      db.collection('todos').doc(user.uid).set({
          todos:[...mytodos,text]
      })
        setText('')
     }

     const deleteTodo = (deleteTodo)=> {
          const docRef = db.collection('todos').doc(user.uid)
          docRef.get().then(docSnap=>{
              const result = docSnap.data().todos.filter(todo => todo !=deleteTodo)
              docRef.update({
                  todos:result
              })
          })
     }
     
    return (
        <div className="container">
          <h3>Add Todos</h3>  
          <div className="input-field">
         
               <input type="text" placeholder="Add todos" value={text} onChange={(e)=>setText(e.target.value)} />
                
          </div>
          <button className="btn green " style={{marginLeft:"45%",marginBottom:"2%"}}  onClick={()=>addTodo()}><i className="material-icons center" >add</i></button>
          <ul className="collection">
          {mytodos.map(todo=>{
        return <li className="collection-item" key={todo}>
             {todo}
             <i className="material-icons right" onClick={()=> deleteTodo(todo)}>delete</i>
            </li>
            })}
      
          </ul>

        </div>
    )
}
