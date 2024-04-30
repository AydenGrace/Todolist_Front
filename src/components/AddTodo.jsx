/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./AddTodo.module.scss";
import { url } from "./../url";

export default function AddTodo({ addTodo = () => {} }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (value.length && e.code === "Enter") handleClick();
  }

  async function createTodo() {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/todos/add`, {
        method: "POST",
        body: JSON.stringify({ content: value }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    if (value) {
      createTodo();
      setValue("");
    }
  }
  return (
    <div className={`f-center mn-20`}>
      <input
        value={value}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a todo..."
        className={`d-flex flex-fill mr-15 ${styles.field}`}
      />
      <button onClick={handleClick} className={`btn btn-primary`}>
        Add
      </button>
      {loading && <p>Chargement en cours</p>}
    </div>
  );
}
