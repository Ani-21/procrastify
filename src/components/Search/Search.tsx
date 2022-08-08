import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { Todo } from "../../Interfaces";
import { Input } from "../Input/Input";
import useDebounce from "../../hooks/useDebounce";

const Search: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const debounce = useDebounce<string>(query, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const showSearchInput = () => {
    setShowInput(!showInput);
  };

  // useEffect(() => {
  //   const getTodos = (todoSearch) => {
  //     setTodos(todoSearch);
  //   };
  // }, [debounce]);

  return (
    <div className="search-input-container">
      <BsSearch onClick={showSearchInput} className="icon-search" />
      {showInput && <Input />}
    </div>
  );
};

export default Search;
