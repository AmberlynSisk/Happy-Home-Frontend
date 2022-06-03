import React, { useEffect, useState } from "react";
import TodoForm from "./todoForm";
import TodoItem from "./todoItem";
import { useAppContext } from "../../../Context";
import axios from "axios";

const TodosList = () => {
  const {currentMember, setCurrentMember} = useAppContext();
  const [todos, setTodos] = useState([]);

  const renderTodos = () => {
    axios
      .get(`http://127.0.0.1:5000/item/get/${currentMember}`)
      .then((res) => {
        setTodos(
          res.data.filter((item) => {
            return item.list_type === "todo";
          })
        );
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

  const addTodo = (text) => {
    fetch("http://127.0.0.1:5000/item/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: text,
        list_type: "todo",
        member_id: currentMember,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setTodos([res, ...todos]);
      })
      .catch((error) => {
        console.log("Error adding list item, please try again", error);
      });
  };


  const removeTodo = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/item/delete/${id}`)
      .then((res) => {
        setTodos(
          [...todos].filter((item) => {
            return item.list_id != id;
          })
        );
      })
      .catch((error) => {
        console.log(
          "An error has occured while deleting your list item.",
          error
        );
      });
  };


  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.list_id === id) {
        todo.is_completed = !todo.is_completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    renderTodos();
    const memberId = window.localStorage.getItem("currentMemberId");
    setCurrentMember(memberId);
  }, []);

  return (
    <div className="todosListContainer">
      <TodoForm addTodo={addTodo} />
      <hr className="seperator" />
      {todos.map((todo) => {
        return (
          <TodoItem
            removeTodo={removeTodo}
            completeTodo={completeTodo}
            todo={todo}
          />
        );
      })}
    </div>
  );
};

export default TodosList;
