import React, { useState } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTodo(input);
    setInput("");
  };

  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        className="todoInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit" className="todoButton">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
