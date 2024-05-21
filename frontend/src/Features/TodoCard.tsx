import { FC, useState } from "react";
import Modal from "@/components/Modal";
import TodoForm from "./TodoForm";
import clsx from "clsx";
import { Todo, TodoCreate } from "@/api/Todos/types";
import { useStore } from "@/Store";
import { X } from "lucide-react";

interface TodoCardProps extends Todo {
  className?: string;
}

const TodoCard: FC<TodoCardProps> = ({ className, ...todo }) => {
  const { title: name, description } = todo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateTodo = useStore((state) => state.updateTodo);

  const handleSubmit = (values: TodoCreate) => {
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-full w-full bg-gray-50 relative pt-5 ">
          <button
            className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1 z-[1]"
            onClick={closeModal}
          >
            <X />
          </button>
          <TodoForm
            onSubmit={handleSubmit}
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
