import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import EditTodoForm from "./EditTodoForm";
import { IoMdSend } from "react-icons/io";
import lightIcon from "../images/icon-sun.svg";
import darkIcon from "../images/icon-moon.svg";
import lightBg from "../images/bg-desktop-light.jpg";
import darkBg from "../images/bg-desktop-dark.jpg";

const TodoList = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) ?? []
  );
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [text, setText] = useState("");
  const [remainder, setRemainder] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState("dark");

  const addTask = () => {
    if (text !== "") {
      const newTask = {
        id: Math.random(),
        value: text,
        completed: false,
        isEditing: false,
      };
      setTasks([newTask, ...tasks]);
      setText("");
    }
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => task.completed !== true));
  };

  const editTodo = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing: !task.isEditing };
        } else {
          return task;
        }
      })
    );
  };

  const editTask = (value, id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, value, isEditing: !task.isEditing };
        } else {
          return task;
        }
      })
    );
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filtering logic runs whenever `tasks` or `filter` changes
  useEffect(() => {
    const filterTasks = () => {
      if (filter === "completed") {
        return tasks.filter((task) => task.completed === true);
      } else if (filter === "active") {
        return tasks.filter((task) => task.completed === false);
      } else {
        return tasks;
      }
    };

    setFilteredTasks(filterTasks());
    setRemainder(tasks.filter((task) => !task.completed).length);
  }, [tasks, filter]);

  return (
    <div>
      <div className="head">
        <img
          src={darkMode ? darkBg : lightBg}
          alt="background"
          id="background"
        />
      </div>
      <div className="wrapper">
        <div className="main">
          <div className="title d-flex justify-content-between align-items-center mb-5">
            <p className="todo mb-0">TODO</p>
            <img
              src={darkMode ? lightIcon : darkIcon}
              alt={darkMode ? "light" : "dark"}
              onClick={toggleTheme}
            />
          </div>

          <div className="input-heading">
            <input type="checkbox" className="myinput" />
            <input
              type="text"
              id="todo-input"
              placeholder="Create a new todo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <IoMdSend className="send-btn" onClick={addTask} />
          </div>

          <ul
            className={
              tasks.length === 0 ? "empty-task-section" : "task-section"
            }
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) =>
                task.isEditing ? (
                  <EditTodoForm editTask={editTask} task={task} key={task.id} />
                ) : (
                  <TodoItem
                    key={task.id}
                    task={task}
                    toggleCompleted={toggleCompleted}
                    deleteTask={deleteTask}
                    editTodo={editTodo}
                  />
                )
              )
            ) : filter === "completed" ? (
              <li className="" id="empty-task">
                No tasks completed
              </li>
            ) : filter === "active" ? (
              <li className="" id="empty-task">
                No active tasks
              </li>
            ) : (
              <li className="" id="empty-task">
                No tasks available
              </li>
            )}
          </ul>

          {tasks.length !== 0 && (
            <div className="features" id="features">
              <div className="record-list">
                <div className="record">
                  <p className="remainder" id="remainder">
                    {remainder}{" "}
                    {remainder === 0
                      ? "items"
                      : remainder === 1
                      ? "item"
                      : "items"}{" "}
                    left
                  </p>

                  <div className="list">
                    <div className="states">
                      <p id="all" onClick={() => setFilter("all")}>
                        All
                      </p>
                      <p id="active" onClick={() => setFilter("active")}>
                        Active
                      </p>
                      <p
                        className="completed"
                        id="completed"
                        onClick={() => setFilter("completed")}
                      >
                        Completed
                      </p>
                    </div>
                  </div>

                  <p className="clear" id="clear" onClick={clearCompleted}>
                    Clear Completed
                  </p>
                </div>
              </div>

              {/* <p id="drag">Drag and drop to reorder list</p> */}
            </div>
          )}
        </div>
        <div class="attribution">
          <p class="mb-0">
            Challenge by{" "}
            <a
              href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW"
              target="_blank"
              rel="noreferrer"
            >
              Frontend Mentor
            </a>
            . Coded by{" "}
            <a
              href="https://github.com/Kodi-ezike"
              target="_blank"
              rel="noreferrer"
            >
              Kodi Ezike
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
