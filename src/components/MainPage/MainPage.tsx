import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { Todo } from "../../Interfaces";
import TodoTask from "../TodoTask/TodoTask";
import Search from "../Search/Search";
import { genericSearch } from "../../utils/genericSearch";
import { genericFilter } from "../../utils/genericFilter";
import TabsGroup, { FilterStatus } from "../TabGroup/TabGroup";
import "./mainPage.sass";

export const MainPage: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<FilterStatus>("pending");

  const id: string = uuid();

  // when reload the data isn't lost
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value);
  };

  const addTask = (): void => {
    const newTask = {
      id: id,
      todoName: todo,
      status: status,
    };
    setTodoList([...todoList, newTask]);
    setTodo("");
    console.log(todoList);
  };

  const deleteTask = (id: string): void => {
    setTodoList((oldTodoList) => oldTodoList.filter((todo) => todo.id !== id));
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

  const resultsTodo = todoList.filter((todo) =>
    genericSearch<Todo>(todo, ["todoName"], query)
  );
  // .filter((todo) => genericFilter<Todo>(todo, filtered));

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
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="row">
          <div className="column">
            <div className="container">
              <div className="todo-list-column">Your list of great plans</div>
              <Search onChangeSearchQuery={(query) => setQuery(query)} />
              <div className="todoList">
                {resultsTodo.map((todo: Todo) => (
                  <TodoTask
                    key={todo.id}
                    deleteTask={() => deleteTask(todo.id)}
                    todo={todo}
                    editTask={editTask}
                  />
                ))}
                {resultsTodo.length === 0 && <p>No todos found 😣</p>}
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
