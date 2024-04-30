/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Todolist from "./components/Todolist";
import styles from "./App.module.scss";
import { url } from "./url.js";
import loading_logo from "./assets/loading.gif";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTodos() {
      try {
        setLoading(true);
        const response = await fetch(`${url}/api/todos/`);
        if (response.ok) {
          const todos = await response.json();
          setTodolist(todos);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
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
        todo._id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function toggleEdit(id) {
    setTodolist(
      todolist.map((todo) =>
        todo._id === id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodolist(todolist.filter((todo) => todo._id !== id));
  }

  function modifyTodo(id, content) {
    setTodolist(
      todolist.map((todo) =>
        todo._id === id ? { ...todo, edit: false, content } : todo
      )
    );
  }

  return (
    <div className={`f-center mh-100`}>
      <div className="f-center flex-column card p-20">
        <h1 className={`mb-20 ${styles.title}`}>Todo List</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          // <p>Chargement en cours...</p>
          <img src={loading_logo} alt="loading..." style={{ width: "50px" }} />
        ) : (
          <Todolist
            todolist={todolist}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
            modifyTodo={modifyTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
