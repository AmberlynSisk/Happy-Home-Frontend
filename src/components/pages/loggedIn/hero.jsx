import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../Context";
import Navbar from "../../navigation/navbar";
import axios from "axios";

const LIHero = () => {
  const { currentMember, setCurrentMember } = useAppContext();
  const [memberInfo, setMemberInfo] = useState({});
  const [todos, setTodos] = useState([]);
  const [chores, setChores] = useState([]);

  const getMemberInfo = () => {
    axios
      .get(`http://127.0.0.1:5000/member/get/${currentMember}`)
      .then((res) => {
        setMemberInfo(res.data);
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

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

  useEffect(() => {
    renderTodos();
    renderChores();
    getMemberInfo();
    const memberId = window.localStorage.getItem("currentMemberId");
    setCurrentMember(memberId);
    console.log(memberInfo);
  }, [currentMember, todos, chores]);

  return (
    <>
      <Navbar />
      <div className="LIHomeContainer">
        <div className="LIHomeWrapper">
          <div className="leftSide">
            <div className="titleWrapper">
              <h1 className="homeTitle">
                Welcome, {memberInfo.first_name} {memberInfo.last_name}
              </h1>
            </div>
            <div className="calendarWrapper">
              <h1 className="calendar">CALENDAR</h1>
            </div>
          </div>
          <div className="rightSide">
            <div className="rightSideWrapper">
              <div className="RSRight list">
                <h1 className="listTitle">To-Dos</h1>
                <ul className="home-list">
                  {todos.map((todo) => {
                    return <li className="list-text">{todo.text}</li>;
                  })}
                </ul>
              </div>
              <div className="RSLeft list">
                <h1 className="listTitle">Chores</h1>
                <ul className="home-list">
                  {chores.map((chore) => {
                    return <li className="list-text">{chore.text}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LIHero;