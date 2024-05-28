import { FC } from "react";
import AddNewTodo from "./AddNewTodo";
import FilterAndSort from "./FilterAndSort";

interface TopbarProps {}

const Topbar: FC<TopbarProps> = () => {
  return (
    <div className="flex justify-between pb-2 pt-8 mx-auto max-w-7xl">
      <AddNewTodo />
      <FilterAndSort />
    </div>
  );
};

export default Topbar;
