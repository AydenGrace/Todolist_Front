/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./OneTodo.module.scss";

export default function OneTodo({
  todo,
  toggleDone = () => {},
  deleteTodo = () => {},
  toggleEdit = () => {},
}) {
  return (
    <li className={`w-100 f-center m-10 ${styles.item} `}>
      <span className="d-flex flex-fill mr-15 align-items-center">
        {todo.content}
        {todo.done && <i className="fa-solid fa-circle-check ml-10 c-g"></i>}
      </span>
      <button
        className="btn btn-primary mr-15"
        onClick={() => {
          toggleDone(todo.id);
        }}
      >
        Valider
      </button>
      <button
        className="btn btn-primary mr-15"
        onClick={() => {
          toggleEdit(todo.id);
        }}
      >
        Modifier
      </button>
      <button
        className="btn btn-primary "
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        Supprimer
      </button>
    </li>
  );
}
