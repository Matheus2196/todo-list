import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/form";
import TodoList from "./components/todoList";


function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todos => todos.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todos => todos.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;   

    }
  }

  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify([]));
  }  
  const getLocalTodos = () => {
    if(localStorage.getItem( "todos" ) ===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem( 'todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>
          My Todo List
        </h1>
      </header>
      <Form 
        inputText={inputText}
        todos={todos} 
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        />
      <TodoList 
      filteredTodos={filteredTodos}
      setTodos={setTodos} 
      todos={todos}
      />
    </div>
  );
}

export default App;
