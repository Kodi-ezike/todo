import React from "react";
import { MdOutlineModeEditOutline, MdClose } from "react-icons/md";
const TodoItem = ({ task, toggleCompleted, deleteTask, editTodo }) => {
  const handleChange = () => {
    toggleCompleted(task.id);
  };
  return (
    <li className="new-task">
      <div>
        <input
          type="checkbox"
          id="task-check"
          className="task"
          name="task-check"
          checked={task.completed}
          onChange={handleChange}
        /> 
        <label htmlFor="check-task"></label>
      </div>
      <p id="task-result">{task.value}</p>
      <span className="icons">
        <MdOutlineModeEditOutline onClick={() => editTodo(task.id)} />
        <MdClose onClick={() => deleteTask(task.id)} className="close-icon"/>
      </span>
    </li>
  );
};

export default TodoItem;
