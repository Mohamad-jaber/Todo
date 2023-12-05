import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const todoDate = localStorage.getItem('todo');
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>(todoDate ? JSON.parse(todoDate) : []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
      localStorage.setItem('todo', JSON.stringify([...todos, { id: Date.now(), todo, isDone: false }]));
    }
    console.log(todos);
  };



  return (
      <div className="App">
        <span className="heading">To Do Task</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
        />
      </div>
  );
};

export default App;