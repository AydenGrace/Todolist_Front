/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./EditTodo.module.scss";

export default function EditTodo({ todo, modifyTodo = () => {} }) {
  const [valueTodo, setValueTodo] = useState(todo.content);

  function handleChange(e) {
    setValueTodo(e.target.value);
  }

  function handleClick() {
    if (valueTodo.length) {
      modifyTodo(todo.id, valueTodo);
    }
  }

  function handleCancel() {
    modifyTodo(todo.id, todo.content);
  }
  return (
    <li className={`w-100 f-center m-10 ${styles.item} `}>
      <input
        type="Text"
        className="d-flex flex-fill mr-15 align-items-center"
        value={valueTodo}
        onChange={handleChange}
      />
      <button className="btn btn-primary mr-15" onClick={handleCancel}>
        Annuler
      </button>
      <button className="btn btn-primary mr-15" onClick={handleClick}>
        Savegarder
      </button>
    </li>
  );
}
