import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../../Context";
import Cookies from 'js-cookie';

const AddMember = () => {
  let navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAppContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAddMember = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/member/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        is_admin: false,
        user_id: currentUser,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/member");
      })
      .catch((error) => {
        console.log(
          "Error with creating new family member, please try again",
          error
        );
      });
  };

  useEffect(() => {
    if (Cookies.get("username")) {
      const userId = window.localStorage.getItem("currentId");
      setCurrentUser(userId);
    }
  });

  return (
    <form className="addAMember" onSubmit={(e) => handleAddMember(e)}>
            <h3 className="formTitle">Add a Family Member</h3>
            <input
              type="text"
              className="memberInput"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="memberInput"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <button type="submit" className="memberBtn">
              Add Family Member
            </button>
          </form>
  )
}

export default AddMember