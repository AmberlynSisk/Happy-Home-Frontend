import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useAppContext } from '../../../Context';
import {Link, useNavigate} from 'react-router-dom';
import Logo from "../../images/Happy.png";

const ChooseMember = () => {
  let navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState(null);

  const getMembers = () => {
    axios
      .get(`http://127.0.0.1:5000/members/get/${currentUser}`)
      .then((res) => {
        setMembers(res.data);
        window.localStorage.setItem("membersData", JSON.stringify(res.data))
      })
      .catch((err) => {
        console.log(
          `An error has occured with your API 'GET' request --> ${err}`
        );
      });
  };

  const handleClick = () => {
    window.localStorage.setItem("currentMemberId", memberId);
    navigate("/");
  }

  const renderMembers = () => {
    return members.map((member) => {
      return (
        <option
          className="memberOption"
          key={member.member_id}
          value={member.member_id}
        >
          {member.first_name} {member.last_name}
        </option>
      );
    });
  };


  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <div className="memberContainer">
        <div className="chooseMember">
          <img src={Logo} alt="logo" />
          <form onSubmit={handleClick}>
            <select className="chooseMemberSelect" onChange={(e) => setMemberId(e.target.value)}>
              <option className="memberOption" value="null">Choose A Family Member</option>
              {renderMembers()}
            </select>
            <button type="submit" className="memberButton">GO</button>
          </form>
          <Link className="newMemberLink" to="/add-member">Add a new family member!</Link>
        </div>
      </div>
    </>
  )
}

export default ChooseMember