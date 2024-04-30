/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Todolist from "./components/Todolist";
import styles from "./App.module.scss";
import { url } from "./url.js";

function App() {
  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(`${url}/api/todos/`);
        if (response.ok) {
          const todos = await response.json();
          setTodolist(todos);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getTodos();
  }, []);

  // Ajout de Todo
  function addTodo(todo) {
    setTodolist([...todolist, todo]);
    console.log(todo);
  }

  function toggleDone(id) {
    setTodolist(
      todolist.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function toggleEdit(id) {
    setTodolist(
      todolist.map((todo) =>
        todo.id === id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodolist(todolist.filter((todo) => todo.id !== id));
  }

  function modifyTodo(id, content) {
    setTodolist(
      todolist.map((todo) =>
        todo.id === id ? { ...todo, edit: false, content } : todo
      )
    );
  }

  return (
    <div className={`f-center mh-100`}>
      <div className="f-center flex-column card p-20">
        <h1 className={`mb-20 ${styles.title}`}>Todo List</h1>
        <AddTodo addTodo={addTodo} />
        <Todolist
          todolist={todolist}
          toggleDone={toggleDone}
          deleteTodo={deleteTodo}
          toggleEdit={toggleEdit}
          modifyTodo={modifyTodo}
        />
      </div>
    </div>
  );
}

export default App;
