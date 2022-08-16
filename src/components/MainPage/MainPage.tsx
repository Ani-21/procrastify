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
  // состояние для каждой отдельной todo
  const [todo, setTodo] = useState<string>("");
  // состояние для отслеживание статуса(прогресса выполнения)
  const [status, setStatus] = useState<string>("");
  // список todos будет сохраняться в localStorage
  const [todoList, setTodoList] = useState<Todo[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );
  // состояния для поиска todo в списке
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<FilterStatus>("pending");

  // генерируем уникальный id
  const id: string = uuid();

  // когда страница перезагружается,
  // данные в localStorage сохраняются
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value);
  };

  // добавление todo
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

  // удаление todo
  const deleteTask = (id: string): void => {
    setTodoList((oldTodoList) => oldTodoList.filter((todo) => todo.id !== id));
  };

  // редактирование todo
  const editTask = (id: string, editedTask: string): void => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todoName: editedTask };
      }
      return todo;
    });
    setTodoList(updatedTodos);
  };

  // сохраняем отфильтрованные (найденные по запросу в поиске) todo
  const resultsTodo = todoList.filter((todo) =>
    genericSearch<Todo>(todo, ["todoName"], query)
  );
  // .filter((todo) => genericFilter<Todo>(todo, filtered));

  return (
    <>
      <div className="header">
        <h1>PROCRASTIFY</h1>
      </div>
      {/*  Область списка дел (также есть возможность редактирования)*/}
      <div className="input-add-сontainer">
        <div className="input-сontainer">
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

          {/*  Область редактирования и статуса дел */}
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
