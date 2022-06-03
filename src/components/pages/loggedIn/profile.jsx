import React, { useEffect, useState } from "react";
import Navbar from "../../navigation/navbar";
import { useAppContext } from "../../../Context";
import axios from "axios";
import Family from "../../images/family3.svg";

const Profile = () => {
  const {currentMember, setCurrentMember, currentUser, setCurrentUser} = useAppContext();
  const [memberInfo, setMemberInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});

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

  const getUserInfo = () => {
    axios
      .get(`http://127.0.0.1:5000/user/get/${currentUser}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

  useEffect(() => {
    getMemberInfo();
    getUserInfo();
    const memberId = window.localStorage.getItem("currentMemberId");
    setCurrentMember(memberId);
    const userId = window.localStorage.getItem("currentId");
    setCurrentUser(userId);
  }, [])

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="profileWrapper">
          <div className="infoWrapper">
            <div className="memberInfo">
              <h1 className="rowTitle">Family Member Info</h1>
              <ul className="member">
                <li className="name memberItem">
                  <b>First Name:</b> <i>{memberInfo.first_name}</i>
                </li>
                <li className="name memberItem">
                  <b>Last Name:</b> <i>{memberInfo.last_name}</i>
                </li>
              </ul>
            </div>
            <div className="accountInfo">
              <h1 className="rowTitle">Account Info</h1>
              <ul className="account">
                <li className="accountItem">
                  <b>Username:</b> <i>{userInfo.username}</i>
                </li>
                <li className="accountItem">
                  <b>Email:</b> <i>{userInfo.email}</i>
                </li>
              </ul>
            </div>
          </div>
          <div className="profileImgContainer">
            <img src={Family} alt="profile-svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
