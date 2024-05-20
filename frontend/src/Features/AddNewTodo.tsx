import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import TodoForm from "./TodoForm";
import { useStore } from "@/Store";
import { TodoCreate } from "@/api/Todos/types";
import { X } from "lucide-react";

const AddNewTodo: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const createTodo = useStore((state) => state.createTodo);

  const toggle = () => {
    setShowForm((curr) => !curr);
  };

  const onSubmit = async (values: TodoCreate) => {
    await createTodo(values);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col relative gap-4 max-w-64 shadow-lg rounded-md transition-all">
      {!showForm && (
        <Button onClick={toggle} variant="outline">
          Add New
        </Button>
      )}

      {showForm && (
        <div className="relative">
          <button
            className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1 z-[1]"
            onClick={toggle}
          >
            <X />
          </button>
          <TodoForm onSubmit={onSubmit} submitText="Add" />
        </div>
      )}
    </div>
  );
};

export default AddNewTodo;
