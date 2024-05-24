import { FC, useState } from "react";
import TodoForm from "./TodoForm";
import clsx from "clsx";
import { Todo } from "@/api/Todos/types";
import { useStore } from "@/Store";
import { CreateTodo } from "dtos";

interface TodoCardProps extends Todo {
  className?: string;
}

const TodoCard: FC<TodoCardProps> = ({ className, ...todo }) => {
  const { title: name, description } = todo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTodo = useStore((state) => state.updateTodo);

  const handleSubmit = (values: CreateTodo) => {
    updateTodo({ ...values, id: todo.id });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={clsx(className, "p-2 bg-slate-50 rounded-md shadow-sm")}
        onClick={openModal}
      >
        <p className="text-2xl font-bold">{name}</p>
        <p className="limit-lines-2">{description}</p>
      </div>
      <TodoForm
        onSubmit={handleSubmit}
        submitText="Update"
        todo={todo}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TodoCard;
