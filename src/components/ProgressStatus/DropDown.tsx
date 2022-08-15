import React, { useEffect, useState } from "react";
import { DropDownProps } from "../../Interfaces";
import "./dropDown.sass";

// создаем небольшое модальное окно,
// чтобы была возможность выбора статуса todo
const DropDown: React.FC<DropDownProps> = ({
  statuses,
  statusSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  // обрабатываем нажатие при выборе опции
  const handleStatusClick = (status: string): void => {
    statusSelection(status);
  };

  // прячем и показываем инпут
  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? "dropdown" : "dropdown active"}>
        {statuses.map((status: string, index: number): JSX.Element => {
          return (
            <p
              key={index}
              onClick={(): void => {
                handleStatusClick(status);
              }}
            >
              {status}
            </p>
          );
        })}
      </div>
    </>
  );
};

export default DropDown;
