import { Todo } from "@/types";
import React, { FC } from "react";

interface TodoCardProps extends Todo {}

const TodoCard: FC<TodoCardProps> = ({ name, description }) => {
  return (
    <>
      <div className="p-2 bg-slate-50 rounded-md shadow-sm">
        <p className="text-2xl font-bold">{name}</p>
        <p className="limit-lines-2">{description}</p>
      </div>
    </>
  );
};

export default TodoCard;
