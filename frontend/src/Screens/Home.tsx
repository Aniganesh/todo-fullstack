import { FC } from "react";
import TodosBoard from "../Features/TodosBoard";
import Topbar from "@/Features/Topbar";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="px-4 h-[calc(100vh_-_64px)]">
      <Topbar />
      <TodosBoard />
    </div>
  );
};

export default Home;
