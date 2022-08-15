import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "../Input/Input";
import useDebounce from "../../hooks/useDebounce";
import "./search.sass";

// определяем интерфейс поиска
export interface SearchProps {
  onChangeSearchQuery: (searchQuery: string) => void;
}

function Search(props: SearchProps) {
  // записываем стейт для запроса
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { onChangeSearchQuery } = props;

  // реализуем возможность, которая будет
  // скрывать или показывать инпут поиска при нажатии иконки
  const [showInput, setShowInput] = useState<boolean>(false);

  // реализуем debounce hook, чтобы запрос
  // не триггерился с каждым нажатием клавиши
  const debounce = useDebounce(searchQuery, 500);

  const showSearchInput = () => {
    setShowInput(!showInput);
  };

  useEffect(() => {
    if (debounce !== undefined) {
      onChangeSearchQuery(debounce);
    }
  }, [debounce, onChangeSearchQuery]);

  return (
    <>
      <div className="search-input-container">
        <BsSearch onClick={showSearchInput} className="icon-search" />
        {showInput && (
          <Input
            type="search"
            placeholder="Type to search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>
    </>
  );
}

export default Search;
