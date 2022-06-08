import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context";
import Navbar from "../../navigation/navbar";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list'

const LIHero = () => {
  const navigate = useNavigate();
  const { currentMember, setCurrentMember, currentUser, setCurrentUser } =
    useAppContext();
  const [memberInfo, setMemberInfo] = useState({});
  const [todos, setTodos] = useState([]);
  const [chores, setChores] = useState([]);
  const [events, setEvents] = useState([]);

  const handleListClick = () => {
    navigate("/lists");
  };

  const getMemberInfo = () => {
    axios
      .get(`https://happyhome-api.herokuapp.com/member/get/${currentMember}`)
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
      .get(`https://happyhome-api.herokuapp.com/item/get/${currentMember}`)
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
      .get(`https://happyhome-api.herokuapp.com/item/get/${currentMember}`)
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

  const getEvents = () => {
    axios
      .get(`https://happyhome-api.herokuapp.com/event/get/${currentUser}`)
      .then((res) => {
        setEvents(res.data);
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
    getEvents();
    const memberId = window.localStorage.getItem("currentMemberId");
    setCurrentMember(memberId);
    const userId = window.localStorage.getItem("currentId");
    setCurrentUser(userId);
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
              <FullCalendar
                events={events}
                plugins={[listPlugin]}
                initialView="listWeek"
                dayMaxEvents={true}
              />
            </div>
          </div>
          <div className="rightSide">
            <div className="rightSideWrapper">
              <div className="RSRight list" onClick={handleListClick}>
                <h1 className="listTitle">To-Dos</h1>
                <ul className="home-list">
                  {todos.map((todo) => {
                    return (
                      <li className="list-text" key={todo.list_id}>
                        {todo.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="RSLeft list" onClick={handleListClick}>
                <h1 className="listTitle">Chores</h1>
                <ul className="home-list">
                  {chores.map((chore) => {
                    return (
                      <li className="list-text" key={chore.list_id}>
                        {chore.text}
                      </li>
                    );
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
