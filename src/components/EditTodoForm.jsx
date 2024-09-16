import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
const EditTodoForm = ({ editTask, task }) => {
  const [text, setText] = useState(task.value);
  return (
    <div className="input-heading " id="edit-input">
      <input type="checkbox" className="myinput" />
      <input
        type="text"
        id="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IoMdSend className="send-btn" onClick={() => editTask(text, task.id)} />
    </div>
  );
};

export default EditTodoForm;
