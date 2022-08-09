import React, { useState, ChangeEvent } from "react";
import { v4 as uuid } from "uuid";

import { Todo } from "../../Interfaces";
import TodoTask from "../TodoTask/TodoTask";
import Search from "../Search/Search";
import TabsGroup, { FilterStatus } from "../TabGroup/TabGroup";
import "./mainPage.sass";

export const MainPage: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<FilterStatus>("pending");

  const id: string = uuid();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTodo(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  };

  const addTask = (): void => {
    const newTask = { id: id, todoName: todo, description: description };
    setTodoList([...todoList, newTask]);
    setTodo("");
    setDescription("");
    console.log(todoList);
  };

  const deleteTask = (id: string): void => {
    console.log("deleted");
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const editTask = (id: string, editedTask: string): void => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todoName: editedTask };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  return (
    <>
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Walk with a dog..."
            name="task"
            value={todo}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            placeholder="Desctription"
            name="description"
            value={description}
            onChange={handleChange}
          /> */}
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="row">
          <div className="column">
            <div className="container">
              <div className="todo-list-column">Your list of great plans</div>
              <Search />
              <div className="todoList">
                {todoList.map((todo: Todo) => (
                  <TodoTask
                    key={todo.id}
                    deleteTask={deleteTask}
                    todo={todo}
                    editTask={editTask}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="container">
              <div className="todo-edit-column">Progress Check</div>
              <TabsGroup
                activeFilter={filtered}
                onFilterChange={(filterStatus) => setFiltered(filterStatus)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
