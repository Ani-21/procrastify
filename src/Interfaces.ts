export interface Todo {
  id: string;
  todoName: string;
  description: string;
}

export interface DropDownProps {
  statuses: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  statusSelection: Function;
}
