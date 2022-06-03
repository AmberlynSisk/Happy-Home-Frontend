import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";

const TodoItem = (props) => {
  const { todo, removeTodo, completeTodo } = props;

  return (
    <div className={todo.is_completed ? "todoRow complete" : "todoRow"}>
      {todo.text}
      <div className="iconsContainer">
        <RiCloseCircleLine
          style={{ marginRight: 5 }}
          onClick={() => removeTodo(todo.list_id)}
        />
        <BiCheckCircle onClick={() => completeTodo(todo.list_id)} />
      </div>
    </div>
  );
};

export default TodoItem;
