import React, { useEffect, useState } from "react";
import ChoresForm from "./choresForm";
import ChoresItem from "./choresItem";
import { useAppContext } from "../../../Context";
import axios from "axios";

const ChoresList = () => {
  const { currentMember, setCurrentMember } = useAppContext();
  const [chores, setChores] = useState([]);

  const renderChores = () => {
    axios
      .get(`http://127.0.0.1:5000/item/get/${currentMember}`)
      .then((res) => {
        setChores(
          res.data.filter((item) => {
            return item.list_type === "chore";
          })
        );
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

  const addChore = (text) => {
    fetch("http://127.0.0.1:5000/item/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: text,
        list_type: "chore",
        member_id: currentMember,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setChores([res, ...chores]);
      })
      .catch((error) => {
        console.log("Error adding list item, please try again", error);
      });
  };

  const removeChore = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/item/delete/${id}`)
      .then((res) => {
        setChores(
          [...chores].filter((item) => {
            return item.list_id !== id;
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

  const completeChore = (id) => {
    let updatedChores = chores.map((chore) => {
      if (chore.list_id === id) {
        chore.is_completed = !chore.is_completed;
      }
      return chore;
    });
    setChores(updatedChores);
  };

  useEffect(() => {
    renderChores();
    const memberId = window.localStorage.getItem("currentMemberId");
    setCurrentMember(memberId);
  }, []);

  return (
    <div className="choresListContainer">
      <ChoresForm addChore={addChore} />
      <hr className="seperator" />
      {chores.map((chore) => {
        return (
          <ChoresItem
            removeChore={removeChore}
            completeChore={completeChore}
            chore={chore}
          />
        );
      })}
    </div>
  );
};

export default ChoresList;
