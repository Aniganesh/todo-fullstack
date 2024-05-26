import { FC } from "react";
import AddNewTodo from "./AddNewTodo";
import FilterAndSort from "./FilterAndSort";

interface TopbarProps {}

const Topbar: FC<TopbarProps> = () => {
  return (
    <div className="flex justify-center gap-4 py-2">
      <AddNewTodo />
      <FilterAndSort />
    </div>
  );
};

export default Topbar;
