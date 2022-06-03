import React, { useEffect, useState } from 'react'
import ChoresList from '../../lists/chores/choresList'
import TodosList from '../../lists/todos/todosList'
import Navbar from '../../navigation/navbar'
import { useAppContext } from "../../../Context";
import axios from "axios";


const Lists = () => {
  const {currentMember, setCurrentMember} = useAppContext();
  const [memberInfo, setMemberInfo] = useState({});


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

  useEffect(() => {
    getMemberInfo();
    const memberId = window.localStorage.getItem("currentMemberId");
    setCurrentMember(memberId);
  }, [])

  return (
    <>
    <Navbar />
    <div className="listsWrapper">
      <div className="todoWrapper">
        <h1 className="listTitle">{memberInfo.first_name}'s To-Dos</h1>
        <TodosList />
      </div>
      <div className="choresWrapper">
        <h1 className="listTitle">{memberInfo.first_name}'s Chores</h1>
        <ChoresList />
      </div>
    </div>
    </>
  )
}

export default Lists