import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { CgPlayListCheck } from "react-icons/cg";
import "./todoTask.sass";
import { Todo } from "../../Interfaces";
import DropDown from "../ProgressStatus/DropDown";

interface Props {
  todo: Todo;
  deleteTask(id: string): void;
  editTask(id: string, editedTask: string): void;
}

const TodoTask = ({ todo, deleteTask, editTask }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [task, setTask] = useState<string>(todo.todoName);

  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [select, setSelectStatus] = useState<string>("");
  const statuses = () => {
    return ["Pending", "In progress", "Done"];
  };

  const statusSelection = (status: string): void => {
    setSelectStatus(status);
  };

  const toggleForm = () => {
    setIsEditing(!isEditing);
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTask(todo.id, task);
    toggleForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteTask((e.target as Element).id);
  };

  let resultTodo;
  if (isEditing) {
    resultTodo = (
      <div className="header">
        <div className="inputContainer">
          <form onSubmit={handleEdit}>
            <input
              type="text"
              placeholder="Task"
              name="task"
              value={task}
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
    );
  } else {
    resultTodo = (
      <div className="todo">
        <div className="content">
          <span>{todo.todoName} </span>
          <span> {todo.description} </span>
        </div>
        <div className="buttons-container">
          {/* Remove task */}
          <button onClick={handleDeleteClick}>X</button>
          {/* Edit task */}
          <button onClick={toggleForm}>
            <i className="fas fa-pen">
              <FaPen />
            </i>
          </button>
          {/* Add description of a task */}
          <button onClick={toggleForm}>
            <i className="fi fi-more">
              <FiMoreHorizontal />
            </i>
          </button>
          {/* Change progress status */}
          <button onClick={toggleDropDown}>
            <i className="cg cg-check">
              <CgPlayListCheck />
            </i>
            <div>
              {showDropDown && (
                <DropDown
                  statuses={statuses()}
                  showDropDown={false}
                  toggleDropDown={toggleDropDown}
                  statusSelection={statusSelection}
                />
              )}
            </div>
          </button>
        </div>
      </div>
    );
  }

  return resultTodo;
};

export default TodoTask;
