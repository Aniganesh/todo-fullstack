import { FC } from "react";
import TodosBoard from "../Features/TodosBoard";
import AddNewTodo from "../Features/AddNewTodo";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="px-4 h-[calc(100vh_-_64px)]">
      <AddNewTodo />
      <TodosBoard />
    </div>
  );
};

export default Home;
