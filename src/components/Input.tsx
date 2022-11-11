import React, { useState } from 'react'
import {FaTrash , FaToggleOn} from 'react-icons/fa'

import '../styles/Style.css'

interface Todo {


    id:number,
    title:string,
    isCompleted:boolean
}

const Input = () => {
    const [toggle , setToggle] = useState<boolean>(true);
    const [inputvalue , setInputValue] = useState<string>('');
    const[todolist , setTodoList] = useState<Todo[]>([

{
    id:0,
    title:"coffee",
    isCompleted:false
},
{
    id:1,
    title:"Milk",
    isCompleted:false
},
{
    id:2,
    title:"Groceries",
    isCompleted:false
},
{
    id:3,
    title:"Shopping",
    isCompleted:false
}
    ]);

const onClick =() =>{
    setToggle(!toggle)
};

const handleComplete =(id:number) =>{
setTodoList(todolist.map(todo => {
    if(todo.id===id){
        return{
            id:todo.id,
            title:todo.title,
            isCompleted:!todo.isCompleted
        } 
    }
    return todo;
}));
};

const handleDelete = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>,id:number) => {
    console.log("remover" , id)
    event.stopPropagation()
    const newList=todolist.filter((todo) => {
      return(
        todo.id !== id
      )  
    });
    setTodoList(newList);
}


  return (
    <div className="div">
        <div className="div1">
    <h1>ToDo</h1>
    <i aria-hidden="true" className="toggle-on toggle" onClick={onClick}>
    <FaToggleOn/>
    </i>
        </div>
      {toggle ? <input type="text"  placeholder="Add new Todo" onChange={(event: React.ChangeEvent<HTMLInputElement>) =>{
setInputValue (event.target.value);
console.log(event);
      }}
      onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key==='Enter' && inputvalue !==''){
            setTodoList([...todolist,{id:new Date().valueOf(), title:inputvalue,isCompleted:false}])
            setInputValue('');
        }
      }}
      value={inputvalue}
    
      /> :null}
        <ul >
            {todolist.map((todo)=>{
                return(
                <li className={`ul ${todo.isCompleted ? `completed` : ""}`}
                 key={todo.id} 
                 onClick={() =>{
                    handleComplete(todo.id)
                }}>
                  <span className='toggle-on' onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>{
                    handleDelete(event,todo.id);
                  }}>
                   <i className='fa fa-trash'/>
                     <FaTrash/>
                  </span >
                     {todo.title};
                </li>
                );
            })};
        </ul>
            </div>
  );
        };

export default Input

