import { Todo } from "@/types";
import { FC, useState } from "react";
import Modal from "@/Components/Modal";
import TodoForm from "./TodoForm";
import clsx from "clsx";

interface TodoCardProps extends Todo {
  className?: string;
}

const TodoCard: FC<TodoCardProps> = ({ className, ...todo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, description } = todo;
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
        onDoubleClick={openModal}
      >
        <p className="text-2xl font-bold">{name}</p>
        <p className="limit-lines-2">{description}</p>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-full w-full bg-gray-50 relative pt-5 ">
          <button
            className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1 z-[1]"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <TodoForm
            onSubmit={console.log}
            submitText="Update"
            todo={todo}
            size="large"
          />
        </div>
      </Modal>
    </>
  );
};

export default TodoCard;
