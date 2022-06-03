import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiCheckCircle } from "react-icons/bi";

const ChoresItem = (props) => {
  const { chore, removeChore, completeChore } = props;

  return (
    <div className={chore.is_completed ? "choresRow complete" : "choresRow"}>
      {chore.text}
      <div className="iconsContainer">
        <RiCloseCircleLine
          style={{ marginRight: 5 }}
          onClick={() => removeChore(chore.list_id)}
        />
        <BiCheckCircle 
          onClick={() => completeChore(chore.list_id)} 
          />
      </div>
    </div>
  );
};

export default ChoresItem;
