/* eslint-disable no-unused-vars */
import React from "react";
import OneTodo from "./OneTodo";
import EditTodo from "./EditTodo";
import styles from "./Todolist.module.scss";

export default function Todolist({
  todolist,
  toggleDone = () => {},
  toggleEdit = () => {},
  deleteTodo = () => {},
  modifyTodo = () => {},
}) {
  return todolist.length ? (
    <ul className={`${styles.list}`}>
      {todolist.map((todo, i) =>
        todo.edit ? (
          <EditTodo key={`${todo._id}`} todo={todo} modifyTodo={modifyTodo} />
        ) : (
          <OneTodo
            key={`${todo._id}`}
            todo={todo}
            toggleDone={toggleDone}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
          />
        )
      )}
    </ul>
  ) : (
    <p>Pas de Todo pour le moment...</p>
  );
}
