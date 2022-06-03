import React, { useState } from "react";

const ChoresForm = (props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addChore(input);
    setInput("");
  };

  return (
    <form className="choresForm" onSubmit={handleSubmit}>
      <input
        className="choresInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a chore"
      />
      <button type="submit" className="choresButton">
        Add Chore
      </button>
    </form>
  );
};

export default ChoresForm;
