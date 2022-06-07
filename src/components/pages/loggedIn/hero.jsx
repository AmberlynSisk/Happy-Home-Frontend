import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context";
import Navbar from "../../navigation/navbar";
import axios from "axios";

const LIHero = () => {
  const navigate = useNavigate();
  const { currentMember, setCurrentMember } = useAppContext();
  const [memberInfo, setMemberInfo] = useState({});
  const [todos, setTodos] = useState([]);
  const [chores, setChores] = useState([]);

  const handleListClick = () => {
    navigate("/lists");
  };

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
  }, [currentMember]);

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
              <div className="RSRight list" onClick={handleListClick}>
                <h1 className="listTitle">To-Dos</h1>
                <ul className="home-list">
                  {todos.map((todo) => {
                    return <li className="list-text" key={todo.list_id}>{todo.text}</li>;
                  })}
                </ul>
              </div>
              <div className="RSLeft list" onClick={handleListClick}>
                <h1 className="listTitle">Chores</h1>
                <ul className="home-list">
                  {chores.map((chore) => {
                    return <li className="list-text" key={chore.list_id}>{chore.text}</li>;
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
